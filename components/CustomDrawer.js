
import { Box, Container } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/media-query";

const CustomDrawer = ({
  children,
  drawerHeader,
  hasCloseButton,
  closeButtonSize,
  showButtonContent,
  hasContainer,
  buttonVariant,
  buttonColorScheme,
  hasVariant,
  drawerSize,
  isFullWidth,
  iconName,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [smAndUp] = useMediaQuery("(min-width: 479px)");
  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm" });

  return (
    <Box>
      <Button
        size={buttonSize}
        cursor="pointer"
        variant={buttonVariant}
        onClick={onOpen}
        colorScheme={buttonColorScheme}
        isFullWidth={isFullWidth}
        bgGradient={
          hasVariant && useColorModeValue(null, "linear(#0987A0, #054450)")
        }
        _hover={{
          bgGradient:
            hasVariant && useColorModeValue(null, "linear(#0987A0, #054450)"),
        }}
        leftIcon={iconName}
      >
        {showButtonContent}
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={drawerSize}>
        <DrawerOverlay>
          <DrawerContent>
            <Container maxW={hasContainer && "container.md"}>
              <DrawerHeader>
                {hasCloseButton && <DrawerCloseButton size={closeButtonSize} />}
                {drawerHeader}
              </DrawerHeader>
              <DrawerBody>{children}</DrawerBody>
            </Container>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
