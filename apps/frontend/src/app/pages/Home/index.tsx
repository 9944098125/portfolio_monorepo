/**
 *
 * Home
 *
 */
import React, { memo, useEffect } from "react";
import styled from "styled-components/macro";
import { HeroSection } from "./components/hero-section";
import RoaringSection from "./components/roaring-section";
import RegistrationForm from "./components/registration-form";
import { Users } from "./components/users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "app/slice/selectors";

interface Props {}

export const Home = memo((props: Props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate(`/${user?._id}`);
    }
  }, [user]);

  return (
    <React.Fragment>
      <HeroSection />
      <div className="my-5"></div>
      <RoaringSection />
      <div className="my-5"></div>
      <Users />
      <div className="my-5"></div>
      <RegistrationForm />
    </React.Fragment>
  );
});
