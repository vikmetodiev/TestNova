import Link from "next/link";
import { useRootStore } from "../provider";

const renderClientLinks = (link) => {
  const store = useRootStore();
  const links = link.split(", ");
  return links.map((item) => {
    if (item.includes("ins__")) {
      return;
    } else {
      let found = store.findById(item);
      return (
        <div className="mb-2" key={item.id}>
          <Link
            href={{
              pathname: "/Clients/[slug]" ,
              query: { slug: found.split(" ").join("-").split("/").join("-") },
            }}
            key={item}
          >
            <a className="link">{found ? found : item}</a>
          </Link>
        </div>
      );
    }
  });
};

export default renderClientLinks;
