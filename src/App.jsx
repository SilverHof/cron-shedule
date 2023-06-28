import { FormBox } from "./components/FormBox/FormBox";
import { Schedule } from "./components/Schedule/Schedule";
import { Warning } from "./components/Warning/Warning";

export const App = () => {
   return (
      <div className="wrapper">
         <main className="main">
            <Schedule />
            <FormBox />
            <Warning />
         </main>
      </div>
   );
};
