import { useNavigate } from "react-router-dom";
import { BookContainer } from "./style";
import { BookCoverProps } from "./types";

const BookCover = ({ title, cover, id }: BookCoverProps) => {
  const navigate = useNavigate()

  return (
    <BookContainer onClick={() => navigate(`book/${id}`)}>
      <img src={cover} alt={title} loading="lazy"/>
      <p>{title}</p>
    </BookContainer>
  );
};

export default BookCover;
