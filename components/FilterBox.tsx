import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { IFindJobRequestPayload } from "../services/findjob.service";

interface IFilterProps {
  onChange: (value: IFindJobRequestPayload) => void;
  filterValue: IFindJobRequestPayload;
  mt?: any;
}

const FilterBoxWrapper = ({
  children,
  mt,
}: {
  children: React.ReactNode;
  mt?: any;
}) => {
  const bg = useColorModeValue("#fff", "primary.very-dark-blue");
  return (
    <Container zIndex={"popover"} maxW="container.brand" mt={mt}>
      <Flex
        borderRadius={"6px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"80px"}
        p="10px"
        bg={bg}
      >
        {children}
      </Flex>
    </Container>
  );
};

const useFilterMethods = ({ filterValue, onChange }: IFilterProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, checked } = e.target;
    onChange({
      ...filterValue,
      [name]: name === "employment_type" ? (checked ? "full time" : "") : value,
    });
  }
  return {
    handleChange,
  };
};

function FilterBox({ onChange, filterValue, mt }: IFilterProps) {
  const isMobile = useBreakpointValue({
    base: true,
    brsm: false,
    md: false,
    lg: false,
  });
  const { handleChange } = useFilterMethods({ onChange, filterValue });

  return (
    <>
      <Box display={{ base: "block", brsm: "none" }}>
        <MobileFilter mt={mt} onChange={onChange} filterValue={filterValue} />
      </Box>
      <Box display={{ base: "none", brsm: "block" }}>
        <FilterBoxWrapper mt={mt}>
          <InputGroup width="100%" maxW="463px">
            <InputLeftElement>
              <Icon color="primary.violet" as={BsSearch} />
            </InputLeftElement>
            <Input
              value={filterValue?.search}
              name="search"
              onChange={handleChange}
              placeholder="Filter by title, companies, expertise…"
              border={"none"}
            />
          </InputGroup>
          <Divider orientation="vertical" />
          <InputGroup width="100%" maxW="300px">
            <InputLeftElement>
              <Icon color="primary.violet" as={SiGooglemaps} />
            </InputLeftElement>
            <Input
              value={filterValue?.location}
              name="location"
              placeholder="Location"
              onChange={handleChange}
              border={"none"}
            />
          </InputGroup>
          <Divider orientation="vertical" />
          <Flex px="10px" flexShrink={0} alignItems={"center"}>
            <Checkbox
              onChange={handleChange}
              isChecked={filterValue.employment_type === "full time"}
              name="employment_type"
            >
              <Heading mr="15px" fontSize={"16px"}>
                {" "}
                Full Time Only
              </Heading>
            </Checkbox>
            <Button bg="primary.violet">Search</Button>
          </Flex>
        </FilterBoxWrapper>
      </Box>
    </>
  );
}

function MobileFilter({ filterValue, mt, onChange }: IFilterProps) {
  const { handleChange } = useFilterMethods({ onChange, filterValue });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("#fff", "primary.very-dark-blue");

  return (
    <FilterBoxWrapper mt={mt}>
      <InputGroup>
        <Input
          value={filterValue?.search}
          name="search"
          onChange={handleChange}
          placeholder="Filter by title, companies, expertise…"
          border={"none"}
          width="70%"
        />
        <InputRightElement width="30%">
          <IconButton
            aria-label="Filter Button"
            variant={"ghost"}
            mx="10px"
            onClick={onOpen}
            icon={<FaFilter width="20px" height="20px" />}
          />
          <IconButton aria-label="Search for jobs" icon={<BsSearch />} />
        </InputRightElement>
      </InputGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius="6px"
          w="95%"
          minH="217px"
          maxW={"327px"}
          px="0"
        >
          <Flex px="24px" alignItems={"center"} minH={"72px"}>
            <InputGroup width="100%">
              <InputLeftElement justifyContent={"flex-start"} h="100%">
                <Icon color="primary.violet" as={SiGooglemaps} />
              </InputLeftElement>
              <Input
                pl="32px"
                value={filterValue?.location}
                name="location"
                placeholder="Location"
                onChange={handleChange}
                border={"none"}
              />
            </InputGroup>
          </Flex>
          <Divider />
          <Checkbox
            onChange={handleChange}
            isChecked={filterValue.employment_type === "full time"}
            name="employment_type"
            my="24px"
            px="24px"
          >
            <Heading mr="15px" fontSize={"16px"}>
              {" "}
              Full Time Only
            </Heading>
          </Checkbox>
          <ModalFooter justifyContent={"center"}>
            <Button w="full" onClick={onClose}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FilterBoxWrapper>
  );
}

FilterBox.propTypes = {};

export default FilterBox;
