import {
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    Rating,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Button,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../constants";
import CustomRating from "./CustomRating";

const LeaveReview = forwardRef((props, ref) => {
    const { courseID } = useParams();
    const reviewInitialState = {
        rating: {
            overallRating: null,
            easiness: null,
            interest: null,
            usefulness: null,
            professorRating: null,
        },
        advice: "",
        comment: "",
        commentOnProf: "",
        content: "",
        deliveryMethod: "",
        grade: "",
        professorName: "",
        term: "",
        textbookUse: "",
        workload: "",
        year: undefined,
        evaluationMethods: [],
    };

    const [review, setReview] = useState(reviewInitialState);

    const handleRateChange = (event) => {
        var rates = review.rating;
        rates[event.target.name] = parseInt(event.target.value);
        setReview({ ...review, rating: rates });
    };

    const handleFormChange = (event) => {
        setReview({ ...review, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //transforming review format
        //removing rating and flattening
        const { ["rating"]: _rating, ...rest } = review;
        const reviewSendFormat = { ...rest, ..._rating };

        //send review to server
        axios
            .post(`${baseUrl}/review/${courseID}`, reviewSendFormat)
            .then((res) => {
                toast.success("Review submitted successfully!");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });

        //clear form
        setReview(reviewInitialState);
    };

    return (
        <Container>
            <div ref={ref}></div>
            <Typography variant="h4" align="center" gutterBottom>
                Leave a Review
            </Typography>
            <br />
            <Grid
                component="form"
                onSubmit={handleSubmit}
                container
                spacing={2}
                rowGap={1}
                columnGap={1}
                sx={{
                    backgroundColor: "#F7F7F7",
                    borderRadius: "3px",
                    boxShadow: "2px 2px #EAEAEA",
                    padding: "9px",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={4.3}
                    style={{
                        background: "white",
                        borderRadius: "3px",
                        boxShadow: "2px 2px #EAEAEA",
                    }}
                >
                    <List component="nav" aria-label="mailbox folders">
                        {Object.entries(review.rating).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <ListItem>
                                        <CustomRating
                                            label={CamelCaseToText(key)}
                                            name={key}
                                            ratingValue={review.rating[key]}
                                            onChange={handleRateChange}
                                        />
                                    </ListItem>
                                    <Divider variant="middle" />
                                </div>
                            );
                        })}
                    </List>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={7.5}
                    style={{
                        background: "white",
                        borderRadius: "3px",
                        boxShadow: "2px 2px #EAEAEA",
                        padding: "15px",
                    }}
                >
                    <Grid container gap={2}>
                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                required
                                label="Professor Name"
                                name="professorName"
                                onChange={handleFormChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormControl required fullWidth>
                                <InputLabel id="term-label">Term</InputLabel>
                                <Select
                                    labelId="term-label"
                                    name="term"
                                    value={review.term}
                                    label="Term"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="Fall">Fall</MenuItem>
                                    <MenuItem value="Winter">Winter</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Year"
                                name="year"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl required fullWidth>
                                <InputLabel id="deliveryMethod-label">
                                    Delivery Method
                                </InputLabel>
                                <Select
                                    labelId="deliveryMethod-label"
                                    name="deliveryMethod"
                                    value={review.deliveryMethod}
                                    label="Delivery Method"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="In person">
                                        In person
                                    </MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl required fullWidth>
                                <InputLabel id="grade-label">Grade</InputLabel>
                                <Select
                                    labelId="grade-label"
                                    name="grade"
                                    value={review.grade}
                                    label="Grade"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="100-86%">100-86%</MenuItem>
                                    <MenuItem value="85-73%">85-73%</MenuItem>
                                    <MenuItem value="72-67%">72-67%</MenuItem>
                                    <MenuItem value="72-67%">66-60%</MenuItem>
                                    <MenuItem value="72-67%">59-50%</MenuItem>
                                    <MenuItem value="Dropped">Dropped</MenuItem>
                                    <MenuItem value="Withdrawal">
                                        Withdrawal
                                    </MenuItem>
                                    <MenuItem value="Rather not say">
                                        Rather not say
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="textbookUse-label">
                                    Textbook Use
                                </InputLabel>
                                <Select
                                    labelId="textbookUse-label"
                                    name="textbookUse"
                                    value={review.textbookUse}
                                    label="Textbook Use"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Optional">
                                        Optional
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6.5}>
                            <FormControl fullWidth>
                                <InputLabel id="evaluationMethods-label">
                                    Evaluation Methods
                                </InputLabel>
                                <Select
                                    labelId="evaluationMethods-label"
                                    name="evaluationMethods"
                                    value={review.evaluationMethods}
                                    label="Evaluation Methods"
                                    multiple
                                    onChange={handleFormChange}
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {[
                                        "Attendance heavy",
                                        "Homework heavy",
                                        "Quizzes heavy",
                                        "Projects heavy",
                                        "Labs heavy",
                                        "Exams heavy",
                                    ].map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth>
                                <InputLabel id="workload-label">
                                    Workload
                                </InputLabel>
                                <Select
                                    labelId="workload-label"
                                    name="workload"
                                    value={review.workload}
                                    label="Workload"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value="Very Light">
                                        Very Light
                                    </MenuItem>
                                    <MenuItem value="Light">Light</MenuItem>
                                    <MenuItem value="Moderate">
                                        Moderate
                                    </MenuItem>
                                    <MenuItem value="Heavy">Heavy</MenuItem>
                                    <MenuItem value="Very Heavy">
                                        Very Heavy
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <TextField
                            fullWidth
                            name="comment"
                            label="Comment on the course"
                            placeholder="How was the course overall?"
                            multiline
                            rows={4}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            name="content"
                            label="Course content"
                            placeholder="What did the course cover?"
                            multiline
                            rows={4}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            name="commentOnProf"
                            label="Comment on the professor"
                            placeholder="How was the professor?"
                            multiline
                            rows={4}
                            onChange={handleFormChange}
                        />
                        <TextField
                            fullWidth
                            name="advice"
                            label="Advice to the future students"
                            placeholder="What advice would you give to future students?"
                            multiline
                            rows={4}
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        padding: 0,
                        paddingRight: "0.01rem",
                    }}
                >
                    <Button variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
});

export default LeaveReview;

function CamelCaseToText(camelCase) {
    return camelCase
        .split(/(?=[A-Z])/)
        .map((word) => word[0].toUpperCase() + word.toLowerCase().slice(1))
        .join(" ");
}
