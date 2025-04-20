import DoctorCard from "../Components/doctor/Doctorcard";
import { useState } from "react";
import doctors from "../data/doctors";
import { Layout, Divider, Pagination, Empty } from "antd";
import FilterBar from "../Components/layout/FilterBar";
import { removeUndefinedValues } from "../lib/utils";
import usePagination from "../hooks/usePagination";

const { Content } = Layout;

const ITEMS_PER_PAGE = 10;
const EXACT_MATCH_FIELDS = ["availability", "specialty"];
function Home() {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const {
    currentPage,
    setCurrentPage,
    paginatedItems: doctorsData,
    totalItems,
  } = usePagination(filteredDoctors, ITEMS_PER_PAGE);

  const createSearchCriteria = (filteredValues) => {
    return Object.entries(filteredValues).map(([key, value]) => ({
      key,
      value: key === "rating" ? Number(value) : String(value).toLowerCase(),
      isRating: key === "rating",
      isExactMatch: EXACT_MATCH_FIELDS.includes(key),
    }));
  };

  const matchesCriteria = (doctor, { key, value, isRating, isExactMatch }) => {
    const doctorValue = doctor[key];

    if (isRating) return doctorValue >= value;
    if (Array.isArray(doctorValue)) {
      return doctorValue.some((item) =>
        String(item).toLowerCase().includes(value)
      );
    }
    if (isExactMatch) {
      return String(doctorValue).toLowerCase() === value;
    }
    return String(doctorValue).toLowerCase().includes(value);
  };

  const handleSearch = (searchTerm) => {
    const filteredValues = removeUndefinedValues(searchTerm);
    const searchCriteria = createSearchCriteria(filteredValues);

    const filtered = doctors.filter((doctor) => {
      if (searchCriteria.length === 0) return true;
      return searchCriteria.every((criteria) =>
        matchesCriteria(doctor, criteria)
      );
    });

    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Content
        className="p-6 md:p-8 lg:p-12"
        role="main"
        aria-label="Doctor search and listing"
      >
        <header className="text-center mx-auto max-w-7xl my-12">
          <h1 className="text-5xl md:text-5xl font-bold text-indigo-800 mb-4">
            Welcome to InvitroCapital
          </h1>
          <h2 className="text-2xl font-bold text-gray-600">
            Better Healthcare for a Better Life
          </h2>
          <Divider className="my-8 border-indigo-200" />
          <FilterBar
            onSearch={handleSearch}
            aria-label="Doctor search filters"
          />
        </header>

        <main>
          {doctorsData.length > 0 ? (
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              aria-label="Doctor listings"
            >
              {doctorsData.map((doc) => (
                <div
                  key={doc.id}
                  className="transform transition duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:outline-none"
                  tabIndex="0"
                  role="article"
                  aria-label={`Doctor ${doc.name}'s profile`}
                >
                  <DoctorCard doctor={doc} />
                </div>
              ))}
            </section>
          ) : (
            <div
              className="flex justify-center items-center"
              role="alert"
              aria-live="polite"
            >
              <Empty
                description={
                  <span className="text-gray-500 text-lg">
                    No Doctors Found
                  </span>
                }
              />
            </div>
          )}

          <nav
            className="flex justify-end m-5"
            aria-label="Pagination navigation"
          >
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={ITEMS_PER_PAGE}
              onChange={setCurrentPage}
              showSizeChanger={false}
              aria-label="Page navigation"
            />
          </nav>
        </main>
      </Content>
    </Layout>
  );
}

export default Home;
