 export const Preloader = ({inProgress, children}) => {
     if (inProgress) {
         return (
             <div>
                 Loading...
             </div>
         )
     }
     return children;
 }