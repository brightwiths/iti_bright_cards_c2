import s from './UsePagination.module.scss';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { paginationColor } from "../../../styles/inlineVariables";
import { paginationTextColorDark } from "../../../styles/inlineVariables";
import { paginationTextColorLight } from "../../../styles/inlineVariables";

const List = styled('ul')({
   listStyle: 'none',
   margin: 0,
   display: 'flex',
   alignItems: "center",
});


export default function UsePagination() {
   const { items } = usePagination({
      count: 10,
   });

   return (
      <nav className={s.UsePagination}>
         <List >
            {items.map(({ page, type, selected, ...item }, index) => {
               let children = null;
               if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                  children = '…';
               } else if (type === 'page') {
                  children = (
                     <button
                        type="button"
                        style={{
                           borderWidth: 0,
                           backgroundColor: selected ? paginationColor : "transparent",
                           color: selected ? paginationTextColorLight : paginationTextColorDark,
                           width: "24px",
                           height: "24px",
                           borderRadius: "3px",
                           fontFamily: "Lato",
                           fontSize: "12px",
                           lineHeight: "120%",
                           cursor: "pointer",
                        }}
                        {...item}
                     >
                        {page}
                     </button>
                  );
               } else {
                  children = (
                     <button type="button" {...item}>
                        {type}
                     </button>
                  );
               } return <li
                  style={{
                     marginRight: "15px",
                  }}
                  key={index}>{children}</li>;
            })}
         </List>
      </nav>
   );
}
