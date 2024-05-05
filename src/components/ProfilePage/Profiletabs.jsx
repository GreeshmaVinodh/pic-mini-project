import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const Profiletabs = () => {
	return (
		<Flex
			w={"full"}
			justifyContent={"center"}
			gap={{ base: 4, sm: 10 }}
			textTransform={"uppercase"}
			fontWeight={"bold"}
		>
			<Flex borderTop={"1px solid white"} alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20}>
					<BsGrid3X3 color={"#127B7E"}/>
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
					Posts
				</Text>
			</Flex>

			{/* <Flex alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20}>
					<BsBookmark color={"#127B7E"}/>
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
					Saved
				</Text>
			</Flex>

			<Flex alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20} color='127B7E'>
					<BsSuitHeart fontWeight={"bold"} color={"#127B7E"} />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }} color={"#127B7E"}>
					Likes
				</Text>
			</Flex> */}
		</Flex>
	);
};

export default Profiletabs;