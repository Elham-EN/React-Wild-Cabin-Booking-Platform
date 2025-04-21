import React from "react";
import styled from "styled-components";
import { useGetUser } from "./useGetUser";

export const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

export const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

type UserMetaData = {
  fullname: string;
  avatar: string;
};

export default function UserAvatar(): React.ReactElement {
  const { user } = useGetUser();
  const { fullname, avatar } = user?.user_metadata as UserMetaData;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={`Avatar of ${fullname}`} />
      <span>{fullname}</span>
    </StyledUserAvatar>
  );
}
