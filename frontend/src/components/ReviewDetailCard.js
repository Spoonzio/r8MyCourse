import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from "@mui/material";
import CustomRating from "./CustomRating";

const ReviewDetailsCard = props => {

  const {review} = props;

  return (
    <Container>
        <Grid
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
                  <div>
                    <ListItem>
                      <CustomRating label='Overall' ratingValue={review.overallRating} readOnly />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                  <div>
                    <ListItem>
                      <CustomRating label='Usefulness' ratingValue={review.usefulness} readOnly />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                  <div>
                    <ListItem>
                      <CustomRating label='Interesting' ratingValue={review.interest} readOnly />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                  <div>
                    <ListItem>
                      <CustomRating label='Easy' ratingValue={review.easiness} readOnly />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
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
                    <Grid item xs={12} md={2} style={{display: 'flex', justifyContent: 'flex-end'}} >
                      <Typography variant="subtitle2">{review.date} </Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Grid container gap={1} justifyContent='space-between'>
                        <Grid item xs={12} md={8} >
                          <Typography variant="subtitle1"><b>Professor:</b> {review.professorName}</Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography variant="subtitle1"><b>Term:</b> {review.term}</Typography>
                          <Divider/>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={12} >
                        <Typography variant="subtitle1"><b>Comments on the course:</b></Typography>
                        <Typography variant="body1">{review.comment}</Typography>
                    </Grid>

                    <Grid item xs={12} >
                      <Typography variant="subtitle1"><b>Course Content:</b></Typography>
                      <Typography variant="body1">{review.content}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Typography variant="subtitle1"><b>Comments on the professor:</b></Typography> 
                      <Typography variant="body1">{review.commentOnProf}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Typography variant="subtitle1"><b>Advice:</b></Typography>
                      <Typography variant="body1">{review.advice}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                      <Grid container gap={2}>
                        <Grid item xs={12} md={5}>
                          <Typography variant="subtitle1"><b>Delivery:</b> {review.deliveryMethod}</Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Typography variant="subtitle1"><b>Grade:</b> {review.grade}</Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Typography variant="subtitle1"><b>Workload:</b> {review.workload}</Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Typography variant="subtitle1"><b>Textbook Use:</b> {review.textbookUse}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container >
                          <Grid item xs={12} md={12}>
                            <Grid container direction={'row'}>
                              {review.evaluationMethods.map(m => {
                                return(
                                <Grid item xs={4} md={4} key={m}>
                                  <Typography variant="subtitle1"><u>{m}</u></Typography>
                                </Grid>
                              )
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);
}


export default ReviewDetailsCard;