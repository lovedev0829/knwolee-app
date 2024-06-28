import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    DrawerProps,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar";

function MobileMenuDrawer({ onClose, isOpen }: Omit<DrawerProps, "children">) {
    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody padding={0}>
                    <Sidebar
                        collapsed={false}
                        setCollapsed={() => {
                            //console.log("disabled");
                        }}
                        isMobile={true}
                        onClose={onClose}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default MobileMenuDrawer;
