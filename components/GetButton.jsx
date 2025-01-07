import React from "react";
import Image from "next/image";
import update from "../images/refresh.png";
import { useAppStore } from "../store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/constants";
import { getIdFromKey, getRandom } from "../utils/common";

const GetButton = ({ text = "Get a movie", cn = "" }) => {
  const router = useRouter();
  const { items } = useAppStore();
  const { id } = router.query;

  const getMovie = () => {
    if (!items?.length) return;

    const filtered = items.filter((item) => getIdFromKey(item) !== id);

    if (filtered.length) {
      const randomIndex = getRandom(filtered.length);
      const newId = getIdFromKey(filtered[randomIndex]);

      router.push(`/${newId}`);
    }
  };

  return (
    <div className={`update ${cn}`} onClick={getMovie}>
      <Image className="icon" src={update} alt="Refresh" width={14} height={14} />
      <span>{text}</span>
    </div>
  );
};

export default GetButton;
