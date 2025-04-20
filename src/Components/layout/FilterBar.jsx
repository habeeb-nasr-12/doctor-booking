import { Select, Input, Rate, Form, Card, Tabs, Button } from "antd";
import { useCallback, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TabPane } = Tabs;

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Oncologist",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "Endocrinologist",
  "Gastroenterologist",
  "Pulmonologist",
];

const availabilityOptions = ["Available", "Unavailable"];
const ratingOptions = [5, 4, 3, 2, 1];

function FilterBar({ onSearch }) {
  const [form] = Form.useForm();
  const [activeSpecialty, setActiveSpecialty] = useState("All Specialties");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce((values) => {
        onSearch(values);
      }, 300),
    [onSearch]
  );

  const handleChange = useCallback(
    (changedValues, allValues) => {
      if (changedValues.name) {
        debouncedSearch({
          ...allValues,
          specialty:
            activeSpecialty === "All Specialties" ? undefined : activeSpecialty,
        });
      } else {
        onSearch({
          ...allValues,
          specialty:
            activeSpecialty === "All Specialties" ? undefined : activeSpecialty,
        });
      }
    },
    [onSearch, debouncedSearch, activeSpecialty]
  );

  const handleSpecialtyChange = (specialty) => {
    setActiveSpecialty(specialty);
    const updatedValues = {
      ...form.getFieldsValue(),
      specialty: specialty === "All Specialties" ? undefined : specialty,
    };
    form.setFieldsValue(updatedValues);
    onSearch(updatedValues);
  };

  const handleClearFilters = () => {
    form.resetFields();
    setActiveSpecialty("All Specialties");
    onSearch({});
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <Card 
      className="mb-6 shadow-sm rounded-lg overflow-hidden border-0"
      role="region"
      aria-label="Doctor search filters"
    >
      <div className="border-b">
        <Tabs
          activeKey={activeSpecialty}
          onChange={handleSpecialtyChange}
          tabBarStyle={{ marginBottom: 0 }}
          role="tablist"
          aria-label="Medical specialties"
          tabBarExtraContent={
            <div className="flex items-center gap-2" role="toolbar" aria-label="Filter controls">
              <Button
                type="text"
                icon={<FilterOutlined />}
                onClick={toggleFilters}
                className="flex items-center"
                aria-expanded={isFilterVisible}
                aria-controls="filter-section"
              >
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </Button>
              {Object.keys(form.getFieldsValue()).some(
                (key) =>
                  form.getFieldValue(key) !== undefined &&
                  form.getFieldValue(key) !== null &&
                  form.getFieldValue(key) !== ""
              ) && (
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleClearFilters}
                  className="text-gray-500"
                  aria-label="Clear all filters"
                >
                  Clear
                </Button>
              )}
            </div>
          }
        >
          {specialties.map((specialty) => (
            <TabPane 
              tab={specialty} 
              key={specialty}
              role="tabpanel"
              aria-label={`Filter by ${specialty}`}
            />
          ))}
        </Tabs>
      </div>

      {isFilterVisible && (
        <div 
          className="p-4 bg-gray-50"
          id="filter-section"
          role="region"
          aria-label="Advanced filters"
        >
          <Form
            form={form}
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            onValuesChange={handleChange}
          >
            <Form.Item 
              name="name" 
              label="Doctor Name" 
              className="mb-0"
            >
              <Input
                placeholder="Search by name"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-md"
                allowClear
                aria-label="Search doctor by name"
              />
            </Form.Item>
            <Form.Item
              name="availability"
              label="Availability"
              className="mb-0"
            >
              <Select
                placeholder="Select availability"
                allowClear
                className="w-full"
                aria-label="Filter by doctor availability"
              >
                {availabilityOptions.map((option) => (
                  <Option 
                    key={option} 
                    value={option}
                    aria-label={`Filter by ${option.toLowerCase()} doctors`}
                  >
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item 
              name="rating" 
              label="Minimum Rating" 
              className="mb-0"
            >
              <Select 
                placeholder="Select rating" 
                allowClear 
                className="w-full"
                aria-label="Filter by minimum rating"
              >
                {ratingOptions.map((rating) => (
                  <Option 
                    key={rating} 
                    value={rating}
                    aria-label={`${rating} stars and above`}
                  >
                    <div className="flex items-center">
                      <Rate
                        disabled
                        defaultValue={rating}
                        className="text-sm"
                        aria-label={`${rating} stars`}
                      />
                      <span className="ml-2 text-gray-500">& above</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      )}
    </Card>
  );
}

export default FilterBar;