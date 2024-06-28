import {
    Badge,
    Link,
    Spinner,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useStripeInvoices } from "src/api/queries/stripeQuery";

function Invoices() {
    const { data: invoices, isLoading } = useStripeInvoices();

    if (isLoading) {
        return <Spinner speed="0.8s" color="primary.50" />;
    }

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Invoice</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th>Created</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {invoices?.data?.map((invoice) => {
                    const {
                        id,
                        number,
                        status,
                        created,
                        total = 0,
                        // invoice_pdf = "",
                        hosted_invoice_url = "",
                    } = invoice;
                    return (
                        <Tr key={id}>
                            <Td>{number}</Td>
                            <Td>
                                <Badge colorScheme={status === "paid" ? "green" : undefined}>
                                    {status}
                                </Badge>
                            </Td>
                            <Td>$ {(total / 100).toFixed(2)}</Td>
                            <Td>{format(new Date(created * 1000), "d MMM yyyy, HH:mm")}</Td>
                            <Td>
                                <Link
                                    // href={invoice_pdf}
                                    href={hosted_invoice_url}
                                    mr={2}
                                    color="teal.500"
                                    fontWeight={"medium"}
                                    target="_blank"
                                >
                                    View
                                </Link>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
}

export default Invoices;
