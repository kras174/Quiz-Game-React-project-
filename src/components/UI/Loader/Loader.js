import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => (
    <div className={classes.center}>
        <div className={classes.Loader}>
            <div className={classes.innerLoader}>
                <div />
                <div>
                    <div />
                </div>
            </div>
        </div>
    </div>
);

export default Loader;
