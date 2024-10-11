// src/components/user/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FlagIcon } from "@heroicons/react/24/solid";
import { Typography, Button } from "@material-tailwind/react";

const NotFoundPage = () => {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Link to="/">
          <Button
            style={{
              backgroundColor: "red",
              fontWeight: "bold",
              fontSize: "20px",
              width: "200px",
              marginTop: "-10px",
            }}
          >
            Trở về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
