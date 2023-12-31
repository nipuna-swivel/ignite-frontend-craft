import SearchBar from "@/components/molecules/SearchBar";
import ProductsGrid from "@/components/organisms/ProductsGrid";
import MainLayout from "@/components/templates/MainLayout";
import { ProductCategory } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { wrapper } from "@/store";
import { addToCart } from "@/store/slices/cart-slice";
import { getProducts } from "@/store/slices/product-slice";
import { Product, ProductQuery } from "@/types";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { ReactNode } from "react";

type ShopProps = {
  search?: string;
  category?: ProductCategory;
};

const TopBar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: "relative",
  height: 80,
  display: "flex",
  justifyContent: "center",
}));

const SearchBarWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: -32,
}));

const Shop = ({ search, category }: ShopProps) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.all.data);

  const handleSearch = (searchText: string, category: string) => {
    dispatch(getProducts({ name: searchText, category }));
  };

  const handleAdd = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <Head>
        <title>My Craft Web | Shop</title>
      </Head>

      <TopBar>
        <SearchBarWrapper data-testid="searchbar-wrapper">
          <SearchBar onSearch={handleSearch} search={search} category={category} />
        </SearchBarWrapper>
      </TopBar>

      <Container sx={{ pt: 10, pb: 8 }}>
        <ProductsGrid products={products} onAdd={handleAdd} />
      </Container>
    </>
  );
};

Shop.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { query } = context;
  const { search, category } = query as { search: string; category: ProductCategory };

  const queryString: ProductQuery = {};

  if (search) queryString.name = search;
  if (category) queryString.category = category;

  await store.dispatch(getProducts(queryString));

  return {
    props: { search: search || "", category: category || "" },
  };
});

export default Shop;
