import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Avatar } from "./ui/avatar";
import { DrawerRoot } from "./ui/drawer";
import { useState } from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { useCustomColor } from "../hooks/useCustomColor";
import { BsPerson, BsPersonAdd } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { textColor } = useCustomColor();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignOut = async () => {
    try {
      await logoutUser();
      toast.success("LogOut successful!");
      navigate("/");
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Avatar cursor={"pointer"} />
        </DrawerTrigger>
        <DrawerContent offset={"5"}>
          <DrawerHeader>
            <HStack>
              <Avatar color={textColor} />
              <DrawerTitle pl={5} color={textColor}>
                User Profile
              </DrawerTitle>
              <ColorModeButton variant={"ghost"} ml={8} />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={4} align="start">
              <HStack>
                <BsPersonAdd size={"30px"} color={textColor} />
                <Button
                  color={textColor}
                  variant="ghost"
                  onClick={handleSignUp}
                  width="80%"
                >
                  Sign Up
                </Button>
              </HStack>
              <HStack>
                <BsPerson size={"30px"} color={textColor} />
                <Button
                  color={textColor}
                  variant="ghost"
                  onClick={handleSignIn}
                  width="80%"
                >
                  Sign In
                </Button>
              </HStack>

              <HStack>
                <BsPerson size={"30px"} color={textColor} />
                <Button
                  color={textColor}
                  variant="ghost"
                  onClick={handleSignOut}
                  width="80%"
                >
                  Sign Out
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default UserProfile;
