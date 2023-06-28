import "./Warning.scss";

export const Warning = () => {
   return (
      <section className="warning">
         <div className="warning__text">
            Warning, cron job implementation does not yet support special
            characters{" "}
            <span className="warning__text-special">W, L, C, /, #, ?</span>
         </div>
      </section>
   );
};
