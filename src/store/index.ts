import { create } from 'zustand';

interface PendingMessageData {
  conversationId: string,
  messageToSend: string
}

interface ChatsState {
  // Maybe this should be an array of pending messages?
  pendingMessageData: PendingMessageData | null;
  setPendingMessageData: (data: PendingMessageData) => void;
  clearPendingMessageData: () => void;
}

export const useChatsStore = create<ChatsState>((set) => ({
    pendingMessageData: null,
    setPendingMessageData: (data: PendingMessageData) => set({ pendingMessageData: data }),
    clearPendingMessageData: () => set({ pendingMessageData: null }),
}))


interface SubscriptionModalProps {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  open: () => void;
  close: () => void;
}

export const useSubscriptionModalStore = create<SubscriptionModalProps>((set) => ({
  isOpen: false,
  toggle: (isOpen: boolean) => set({ isOpen: !isOpen }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));


interface BillingManagerModalProps {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  open: () => void;
  close: () => void;
}
export const useBillingManagerModalStore = create<BillingManagerModalProps>((set) => ({
  isOpen: false,
  toggle: (isOpen: boolean) => set({ isOpen: !isOpen }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));