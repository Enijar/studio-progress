import styled, { css } from "styled-components";
import { colorFromValue } from "../../utils";

export const ActivitiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  h1 {
    font-size: 2em;
    margin-bottom: 0.75em;
  }

  time {
    font-size: 0.75em;
    margin-left: 0.5em;
    font-style: italic;
  }
`;

export const ActivityWrapper = styled.div`
  flex-basis: 50%;
  padding: 1em;
`;

type ActivitiesAvatarProps = {
  avatar: string;
  uuid: string;
};

const SIZE = 1.75;

export const ActivitiesAvatar = styled.div<any>`
  width: ${SIZE}em;
  height: ${SIZE}em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  border-radius: 50%;
  overflow: hidden;

  ${(props: ActivitiesAvatarProps) => {
    const color = colorFromValue(props.uuid);

    return css`
      div {
        width: 100%;
        height: 100%;
        background-color: ${color};
        font-size: 0.75em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }}
`;

export const ActivitiesItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  ${ActivitiesAvatar} {
    margin-right: 0.5em;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

type ActivitiesRepositoryProps = {
  uuid: string;
};

export const ActivitiesRepository = styled.span<any>`
  font-weight: bold;

  ${(props: ActivitiesRepositoryProps) => {
    const color = colorFromValue(props.uuid);
    return css`
      color: ${color};
    `;
  }}
`;
