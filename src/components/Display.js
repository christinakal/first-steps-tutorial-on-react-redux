import React from "react";
import { connect } from "react-redux";

const Display = (stuff) => {
    return(
        <div>
            <ol>
                {stuff.state.map((e,id)=>
                    (<li key={id}>{e}</li>)
                )}
            </ol>
        </div>
    );
};

const mapStateToProps = state => {
    return {state};
};

export default connect(mapStateToProps)(Display);
