
import Dashboard from "../FirstPage_dashboard/page";
import { Metadata } from "next";
import DefaultLayout from "@/app/Component/Layout/defaultLayout";
import React from "react";
import SessionCheck from "@/app/Component/sessioncheck";


export default function Home() {
  return (
    <>
      <SessionCheck />
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
