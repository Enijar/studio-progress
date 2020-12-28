import React from "react";
import { AvatarWrapper } from "./styles";

type Props = {
  name: string;
};

export default function Avatar({ name }: Props) {
  const initials = React.useMemo<string>(() => {
    const [firstName, lastName = ""] = name.split(" ");
    const firstInitial = firstName.substr(0, 1).toUpperCase();
    const lastInitial = lastName.substr(0, 1).toUpperCase();
    return `${firstInitial} ${lastInitial}`.trim();
  }, [name]);

  return <AvatarWrapper>{initials}</AvatarWrapper>;
}
