import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VotingForm from "./VotingForm";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<VotingForm />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
