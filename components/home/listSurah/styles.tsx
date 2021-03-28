import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
  useTheme
} from "@material-ui/core/styles";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";

const ChapterCard = styled(Card)`
  @media screen and (min-width: 345px) {
    min-width: 300px;
  }
`;

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 1
  }
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export { styles, useStyles, ChapterCard };
