import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import orders from '@services/orders';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';

interface Props {
  orderId: string;
  isModalOpen: boolean;
  handleCloseModal(): void;
}

export const CancelOrder = ({
  orderId,
  isModalOpen,
  handleCloseModal,
}: Props) => {
  const toast = useToast();
  const finalRef = useRef(null);
  const [reason, setReason] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationKey: `cancel-${orderId}`,
    mutationFn: () => orders.cancelOrder(orderId ?? '', reason),
    onSuccess() {
      toast({
        status: 'success',
        description: 'Successfully canceled order',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
    onError() {
      toast({
        status: 'error',
        description: 'Error canceling order',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
    onSettled() {
      handleCloseModal();
      setReason('');
    },
  });

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cancel order # {orderId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="sm">
            Enter the reason you are canceling your order
          </Heading>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="The reason you are canceling your order"
            marginTop="2"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            cancel action
          </Button>
          <Button
            variant="ghost"
            isLoading={isLoading}
            onClick={() => mutate()}
          >
            cancel order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
