import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "../../generated/graphql";
import ReadyToProcessCard from "./readyToProcessCard";

export default function ReadyToProcessList({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <>
      {products && products.length > 0 && (
        <>
          <SimpleGrid columns={5} spacing="24px">
            {products.map((product) => (
              <>
                <ReadyToProcessCard product={product} />
              </>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
}
