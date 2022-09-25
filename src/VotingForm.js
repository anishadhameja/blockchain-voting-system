import React, { useEffect } from "react";
import {
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    Avatar,
    Button,
    CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { candidates } from "./candidatesDetails";
import Chart from "react-apexcharts";
import { getVotes, giveVote, isVoted } from "./vote";
import { chartConfig } from "./chartDetails";

function VotingForm(props) {
    const [vote, setVote] = React.useState("NOTA");
    const [voterId, setVoterId] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [stats, setStats] = React.useState(chartConfig);

    useEffect(() => {
        const callAPI = async () => {
            setLoading(true);
            chartConfig.series[0].data = [];
            for (let i = 0; i < candidates.length; i++) {
                const res = await getVotes(candidates[i].shortName);
                chartConfig.series[0].data.push({
                    x: candidates[i].shortName,
                    y: res,
                });
            }

            setLoading(false);
            setStats({ ...chartConfig });
        };
        callAPI();
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const proceed = window.confirm(
            `Are you sure want to give vote to ${vote} ?`
        );
        if (proceed) {
            console.log(voterId, vote);
            const voted = await isVoted(voterId, vote);
            if (voted === "Already voted") {
                toast.warning(
                    "User with voterID: " + voterId + " is already voted"
                );
                setLoading(false);
            } else {
                giveVote(voterId, vote)
                    .then((res) => {
                        toast.success(
                            voterId + " is successfully voted to " + vote
                        );
                        setLoading(false);
                    })
                    .catch((e) => {
                        toast.error("Some error occured");
                        console.log(e);
                        setLoading(false);
                    });
            }
        }
    };

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <div
                        style={{
                            display: "grid",
                            placeItems: "center",
                            marginBottom: 100,
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1 style={{ textAlign: "center" }}>
                                Voting 2022 - 2023
                            </h1>
                            <div>
                                <FormControl sx={{ m: 5 }}>
                                    <TextField
                                        id="standard-helperText"
                                        label="Voter ID"
                                        variant="filled"
                                        sx={{ width: 400 }}
                                        type="email"
                                        name="email"
                                        required
                                        onChange={(e) =>
                                            setVoterId(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl
                                    required
                                    sx={{ m: 5, minWidth: 400 }}
                                >
                                    <InputLabel>Vote</InputLabel>
                                    <Select
                                        value={vote}
                                        label="Vote *"
                                        name="votedTo"
                                        onChange={(e) =>
                                            setVote(e.target.value)
                                        }
                                        required
                                    >
                                        {candidates.map((candidate, key) => (
                                            <MenuItem
                                                value={candidate.shortName}
                                                key={key}
                                            >
                                                <div
                                                    style={{ display: "flex" }}
                                                >
                                                    <Avatar
                                                        alt={
                                                            candidate.shortName
                                                        }
                                                        src={
                                                            candidate.symbolImage
                                                        }
                                                        sx={{ mr: 2 }}
                                                    />
                                                    {candidate.fullName} (
                                                    {candidate.shortName})
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    style={{ width: "80%" }}
                                    type="submit"
                                >
                                    Vote
                                </Button>
                            </div>
                        </form>
                    </div>
                    <h1>Current Voting Status</h1>
                    <Chart
                        options={stats.options}
                        series={stats.series}
                        type="bar"
                        width="100%"
                        height="80%"
                    ></Chart>
                </>
            )}
            <ToastContainer />
        </div>
    );
}

export default VotingForm;
