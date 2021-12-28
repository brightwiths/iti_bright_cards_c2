import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {getPacksTC, getUserIdAC, packsStateType} from "../../n1-main/m2-bll/packsReducer";
import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {NavLink, useNavigate} from "react-router-dom";
import {PaginationPacksContainer} from "../f2-table/Pagination/PaginationPacksContainer";
import {SortCardPacksContainer} from "../f2-table/Sort/SortCardPacksContainer/SortCardPacksContainer";
import s from './Pack.module.scss'
import {SearchCardsPacksContainer} from "../f2-table/Search/SearchCardsPacksContainer/SearchCardsPacksContainer";
import {SortPackType} from "../../n1-main/m2-bll/findAndPaginationReducer";
import {
    setClickedCardPackId,
    showModalAddCardsPackAC,
    showModalDelCardsPackAC,
    showModalUpdateCardsPackAC
} from "../../n1-main/m2-bll/modalReducer";
import NewPackModal from "../../assets/components/new-pack-modal/NewPackModal";
import DeletePackModal from "../f5-modal/ModalDelPack/DeletePackModal";
import {Checkbox} from "@mui/material";
import UpdatePackModal from "../../assets/components/update-pack-modal/UpdatePackModal";
import {RequestStatusType} from "../../n1-main/m2-bll/appReducer";

export const Packs = () => {
    const {cardPacks} = useSelector<AppStoreType, packsStateType>(state => state.packs)
    const pageCount = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.page)
    const sortPacks = useSelector<AppStoreType, SortPackType>(state => state.findAndPagination.cardPacks.sortPacks)
    const user_id = useSelector<AppStoreType, string>(state => state.profile._id)
    const packUserId = useSelector<AppStoreType, string>(state => state.packs.packUser_id)
    const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

    const [myPacks, setMyPacks] = useState<boolean>(!!packUserId)

    const dispatch = useDispatch()
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, pageCount, page, sortPacks])

    const addPacksHandler = () => {
        dispatch(showModalAddCardsPackAC())
    }

    const showModalDelPackHandler = (id: string) => {
        dispatch(setClickedCardPackId(id))
        dispatch(showModalDelCardsPackAC())
    }

    const showModalUpdatePackHandler = (id: string) => {
        dispatch(setClickedCardPackId(id))
        dispatch(showModalUpdateCardsPackAC())
    }

    /*useEffect(() => {
        dispatch(InitializeTC())
    }, [])*/

    const startLearnHandler = (packId: string) => {
        localStorage.setItem('cardsPacks', JSON.stringify(cardPacks)) // this go to LS, to save it on F5 Learn.

        navigate(`/learn/${packId}`, {replace: true})
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(getUserIdAC(myPacks ? '' : user_id))
        dispatch(getPacksTC())
        setMyPacks(e.target.checked)
    }

    return (
        <>
            <UpdatePackModal />
            <NewPackModal/>
            <DeletePackModal/>
            <TableContainer className={s.table} component={Paper}>
                <PaginationPacksContainer/>
                <SearchCardsPacksContainer/>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className={s.cell}>Name<SortCardPacksContainer upperSort={'0name'}
                                                                                    lowerCount={'1name'}/></div>
                            </TableCell>
                            <TableCell align="center" className={s.cell}>
                                <div className={s.cell}>Cards Count<SortCardPacksContainer upperSort={'0cardsCount'}
                                                                                           lowerCount={'1cardsCount'}/>
                                </div>
                            </TableCell>
                            <TableCell align="center">
                                <div className={s.cell}>Updated<SortCardPacksContainer upperSort={'0updated'}
                                                                                       lowerCount={'1updated'}/></div>

                            </TableCell>
                            <TableCell align="center">My Packs <Checkbox onChange={onChangeHandler}/></TableCell>
                            <TableCell align="center">url</TableCell>
                            <TableCell align='center'>
                                <button onClick={addPacksHandler} disabled={appStatus === "loading"}>add</button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((mp) => (
                            <TableRow
                                key={mp._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{mp.name}
                                </TableCell>
                                <TableCell align="center">{mp.cardsCount}</TableCell>
                                <TableCell align="center">{mp.updated}</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align='center'>
                                    <button onClick={() => showModalDelPackHandler(mp._id)}>del</button>
                                </TableCell>
                                <TableCell align='center'>
                                    <button onClick={() => showModalUpdatePackHandler(mp._id)}>update</button>
                                </TableCell>
                                <TableCell align='center'>
                                    <button disabled={!mp.cardsCount} onClick={
                                        () => {
                                            startLearnHandler(mp._id)
                                        }
                                    }>learn
                                    </button>
                                </TableCell>
                                <TableCell align="center"> <NavLink to={`/cards/${mp._id}`}>cards</NavLink></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

// todo: cards link is not user friendly. Maybe good idea to do it more visible or "click on card pack show it".
