import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { ChapterCard } from "./styles";
interface NoDataListSurahProps {
  classes: {
    bullet: string;
    pos: string;
  };
}

export default function NoDataListSurah({ classes }: NoDataListSurahProps) {
  return (
    <Grid item xs>
      <ChapterCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Skeleton />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <Skeleton variant="text" width="60%" />
          </Typography>
        </CardContent>
        <CardActions>
          <Skeleton variant="rect">
            <Button size="small">Read Surah</Button>
          </Skeleton>
          <Skeleton variant="rect">
            <Button size="small">See Info</Button>
          </Skeleton>
        </CardActions>
      </ChapterCard>
    </Grid>
  );
}
