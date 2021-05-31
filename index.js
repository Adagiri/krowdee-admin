<Box w="100%" h={{ base: "7vh", sm: "8vh" }} d="flex" alignItems="center">
<Container maxW="container.lg">
  <Flex justify="space-between" align="center">
    <Box>
      <Text
        fontSize={{ base: "13px", sm: "inherit" }}
        fontWeight="semibold"
      >
        AbdulAzeez
        <Badge
          ml={1.5}
          variant="solid"
          fontSize={{ base: "smaller", sm: "12px" }}
          borderRadius="md"
          colorScheme="purple"
        >
          Senior
        </Badge>
      </Text>
    </Box>
    <Flex align="center">
      <Button
        variant="ghost"
        colorScheme="brand"
        as={buttonType}
        size={buttonSize}
        px={{ base: 0, sm: "12px" }}
        aria-label={smAndUp ? "trophy" : null}
        icon={smAndUp ? null : <RiTrophyFill size={iconSize} />}
        leftIcon={smAndUp ? <RiTrophyFill size={iconSize} /> : null}
      >
        {smAndUp ? "Leaderboard" : null}
      </Button>

      <Menu isLazy>
        <MenuButton
          size="xs"
          as={IconButton}
          variant="ghost"
          aria-label="notification-icon"
          mx={{ base: 2, sm: 3 }}
          icon={<IoNotifications size="18px" />}
        />
        <MenuList>
          <MenuGroup title="Notifications">
            <MenuDivider />
            <MenuItem fontSize="xs">
              <HStack spacing={1.5} align="center">
                <ChakraGiftIcon
                  size="15px"
                  color={useColorModeValue("brand.400", "brand.300")}
                />
                <span>
                  You earned{" "}
                  <chakra.span fontWeight="bold">20 points!</chakra.span>{" "}
                </span>
              </HStack>
            </MenuItem>
            <MenuItem fontSize="xs">
              <HStack spacing={1.5} align="center">
                <ChakraFlowerIcon
                  size="15px"
                  color={useColorModeValue("purple.400", "purple.200")}
                />
                <span>
                  You've moved to{" "}
                  <chakra.span fontWeight="bold">Senior!</chakra.span>{" "}
                </span>
              </HStack>
            </MenuItem>
            <MenuDivider />
            <Text
              fontSize="10px"
              px="3"
              color={useColorModeValue("gray.400", "gray.400")}
            >
              Notification disappears after 24hrs!
            </Text>
          </MenuGroup>
        </MenuList>
      </Menu>

      <Menu isLazy>
        <MenuButton
          as={IconButton}
          variant="ghost"
          size="xs"
          aria-label="more-icon"
          icon={<RiMoreFill size={iconSize} />}
        />
        <MenuList zIndex={2}>
          <Link href="/app">
            <MenuItem
              icon={<RiDashboardLine size="18px" />}
              fontSize="14px"
              bgColor={
                router.pathname === "/app"
                  ? useColorModeValue("brand.50", "brand.600")
                  : ""
              }
            >
              Dashboard
            </MenuItem>
          </Link>
          <Link href="/app/records">
            <MenuItem
              bgColor={
                router.pathname === "/app/records"
                  ? useColorModeValue("brand.50", "brand.600")
                  : ""
              }
              icon={<RiPencilLine size="18px" />}
              fontSize="14px"
            >
              Records
            </MenuItem>
          </Link>
          <Link href="/app/me">
            <MenuItem
              bgColor={
                router.pathname === "/app/me"
                  ? useColorModeValue("brand.50", "brand.600")
                  : ""
              }
              icon={<RiUser6Line size="18px" />}
              fontSize="14px"
            >
              Profile
            </MenuItem>
          </Link>
          <Link href="/app/create">
            <MenuItem
              bgColor={
                router.pathname === "/app/create"
                  ? useColorModeValue("brand.50", "brand.600")
                  : ""
              }
              icon={<HiOutlinePencilAlt size="18px" />}
              fontSize="14px"
            >
              Created Contest
            </MenuItem>
          </Link>
          <MenuItem
            icon={
              colorMode === "light" ? (
                <RiMoonLine size="18px" />
              ) : (
                <RiSunLine size="18px" />
              )
            }
            fontSize="14px"
            onClick={toggleColorMode}
          >
            {" "}
            {colorMode === "light" ? "Dark Mode" : "Light Mode"}{" "}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </Flex>
</Container>
</Box>