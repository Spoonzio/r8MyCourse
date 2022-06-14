import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import LeaveReview from "../components/LeaveReview";
import ClearIcon from "@mui/icons-material/Clear";
import ReviewDetailsCard from "../components/ReviewDetailCard";
import { baseUrl } from "../constants";

export default function Review() {
    //this ref is used to scroll to the leaveReview element
    const leaveReviewRef = useRef(null);
    const { courseID } = useParams();

    const [courseInfo, setCourseInfo] = useState();
    useEffect(() => {
        //fetch course info here and set state
        axios.get(`${baseUrl}/courses/${courseID}`,)
        .then(res => {
            const course = res.data;
            return course;
        })
        .then((courseData)=>{
            axios.get(`${baseUrl}/departments/${courseData.department}`,)
            .then(res => {
                const dept = res.data;
                setCourseInfo({
                    id: courseData._id,
                    courseId: courseData.courseId,
                    courseName: courseData.courseName,
                    department: dept.deptName,
                    overall: 5,
                    easiness: 3,
                    usefulness: 5,
                    reviews: 1,
                });
            });
        })

    }, []);

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        //fetch reviews here and set state
        axios.get(`${baseUrl}/reviews/course/${courseID}`,)
        .then(res => {
            const reviews = res.data;
            reviews.forEach(review => {
                review.id = review._id;
            });
            
            setReviews(reviews);
        });
    }, []);

    const [possibleProfessors, setPossibleProfessors] = useState([]);
    useEffect(() => {
        if (reviews.length > 0) {
            setPossibleProfessors(
                reviews.map((review) => review.professorName)
            );
        }
    }, [reviews]);

    //this section of the code handles the filtering of the reviews
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const filterInitialState = {
        professorName: "",
        deliveryMethod: "",
        term: "",
    };
    const [reviewFilterCriteria, setReviewFilterCriteria] =
        useState(filterInitialState);
    const handleFilterChange = (event) => {
        setReviewFilterCriteria({
            ...reviewFilterCriteria,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        const filtered = reviews
            .filter(
                (review) =>
                    review.professorName ===
                        reviewFilterCriteria.professorName ||
                    reviewFilterCriteria.professorName === ""
            )
            .filter(
                (review) =>
                    review.deliveryMethod ===
                        reviewFilterCriteria.deliveryMethod ||
                    reviewFilterCriteria.deliveryMethod === ""
            )
            .filter(
                (review) =>
                    review.term === reviewFilterCriteria.term ||
                    reviewFilterCriteria.term === ""
            );
        setFilteredReviews(filtered);
    }, [reviewFilterCriteria, reviews]);
    const handleClearFilter = () => {
        setReviewFilterCriteria(filterInitialState);
    };

    if (!courseInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                marginTop: "25px",
                marginBottom: "40px",
            }}
        >
            <Container>
                <Typography variant="h4" fontWeight="regular">
                    {courseInfo["courseId"]}
                </Typography>
                <Typography variant="h6" fontWeight="regular">
                    {courseInfo["courseName"]}
                </Typography>
                <Typography variant="h6" fontWeight="regular" gutterBottom>
                    {courseInfo["department"]}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        leaveReviewRef.current.scrollIntoView();
                    }}
                >
                    Leave a Review
                </Button>

                <Grid
                    container
                    sx={{ marginTop: "10px", marginBottom: "20px" }}
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={3}>
                        <Typography variant="h6">Filter Reviews</Typography>
                    </Grid>
                    <Grid item xs>
                        <FormControl fullWidth>
                            <InputLabel id="professor-name-label">
                                Professor Name
                            </InputLabel>
                            <Select
                                labelId="professor-name-label"
                                label="Professor Name"
                                value={reviewFilterCriteria.professorName}
                                name="professorName"
                                onChange={handleFilterChange}
                            >
                                {possibleProfessors.map((professor) => (
                                    <MenuItem key={professor} value={professor}>
                                        {professor}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl fullWidth>
                            <InputLabel id="deliveryMethod-label">
                                Delivery Method
                            </InputLabel>
                            <Select
                                labelId="deliveryMethod-label"
                                label="Delivery Method"
                                name="deliveryMethod"
                                value={reviewFilterCriteria.deliveryMethod}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="In person">In person</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl fullWidth>
                            <InputLabel id="term-label">Term</InputLabel>
                            <Select
                                labelId="term-label"
                                value={reviewFilterCriteria.term}
                                label="Term"
                                name="term"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="Fall">Fall</MenuItem>
                                <MenuItem value="Winter">Winter</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={handleClearFilter}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>

            <Typography variant="h5" align="center" gutterBottom>
                Class Ratings
            </Typography>
            <br/>
            {filteredReviews.map((review) => (
                <div key={review.id}>
                    <ReviewDetailsCard review={review} />
                    <br/>
                </div>
                
            ))}

            <LeaveReview ref={leaveReviewRef} />
        </Box>
    );
}
