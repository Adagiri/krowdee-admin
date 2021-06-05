import React, { useEffect, useState } from "react";
import { Box, Flex, Grid } from "@chakra-ui/layout";

import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";

import { useRouter } from "next/router";
import { GrFormAdd } from "react-icons/gr";

import DashNav from "./DashNav";
import Head from "next/head";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";

import { useDisclosure } from "@chakra-ui/hooks";
import { Select } from "@chakra-ui/select";

import { GET_S3_URL, GET_TASKS } from "../state/remote/queries";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import Task from "./Task";
import TaskModal from "./TaskModal";

import BarLoader from "react-spinners/BarLoader";
import { taskModalVar } from "../state/local";
import { FormControl } from "@chakra-ui/form-control";

const Tasks = () => {
  const [cat, setCat] = useState(null);
  const [txt, setTxt] = useState(null);

  /////GET_TASKS
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { cat, txt, cursor: 1 },
    fetchPolicy: "no-cache",
  });

  // console.log(data, loading, error);

  //chakra hooks
  const [smAndUp] = useMediaQuery("(max-width: 370px)");
  const [mdAndUp] = useMediaQuery("(max-width: 800px)");

  //next hook
  const router = useRouter();

  let [color, setColor] = useState("#ffffff");

  return (
    <Box>
      <Head>
        <title>Tasks | Krowdee! </title>
      </Head>
      <DashNav />

      <Box position="fixed" right="4rem" bottom="4rem">
        <IconButton
          bgGradient={useColorModeValue(
            "linear(#0987A0, #054450)",
            "linear(#0987A0, #fff)"
          )}
          _hover={{
            bgGradient: useColorModeValue(
              "linear(#0987A0, #054450)",
              "linear(#0987A0, #fff)"
            ),
          }}
          aria-label="Send email"
          icon={<GrFormAdd />}
          size="lg"
          borderRadius="2rem"
          onClick={() => taskModalVar(true)}
        />
      </Box>

      <Flex justify="space-evenly" align="center" pt="2">
        <Box>
          <Input
            variant="flushed"
            placeholder="search tasks"
            onChange={(e) => {
              setTxt(e.target.value);
              setTimeout(() => refetch(), 500);
            }}
            maxW="7rem"
          />
        </Box>{" "}
        <Box pl="2" borderBottomWidth="1px">
          <FormControl>
            <Select
              placeholder="All"
              variant="unstyled"
              onChange={(e) => {
                setCat(e.target.value);
                setTimeout(() => refetch(), 500);
              }}
              cursor="pointer"
            >
              <option>Maths</option>
              <option>Tech</option>
              <option>Science</option>
              <option>Finance</option>
              <option>Programming</option>
              <option>English</option>
              <option>History</option>
            </Select>
          </FormControl>
        </Box>
      </Flex>
      <Grid
        templateColumns={
          smAndUp
            ? "repeat(1, 1fr)"
            : mdAndUp
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)"
        }
        gap={2}
        padding="4"
        minH="full"
        borderTopWidth="1px"
        mt="3"
        overflow="hidden"
      >
        {data &&
          data.getTasks.map((task) => (
            <Task key={task._id} refetch={refetch} task={task} />
          ))}

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            minHeight="65vh"
          >
            <BarLoader
              color={color}
              loading={loading}
              //  css={{display: "block", color: "blue"}}
              size={300}
            />
          </Box>
        )}
      </Grid>
      <TaskModal refetch={refetch} />
    </Box>
  );
};

export default Tasks;

// opt: String!
// img: String
// opts: [optionInput]!
// valid: String!
// cat: String!
// force: Boolean
