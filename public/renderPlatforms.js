import Link from "next/link";
import { useRootStore } from "../provider";

const renderPlatformLinks = (link) => {
  const store = useRootStore();
  const links = link.split(", ");
  return links.map((item, i) => {
    if (item.includes("ins__")) {
      return;
    } else {
      let found = store.findById(item);
      return (
        <div key={i} className="mb-2">
          <Link
            href={{
              pathname: "/ServicesByPlatform/[slug]",
              query: {slug: found.split(" ").join("-").split("/").join("-") }
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

export default renderPlatformLinks;
