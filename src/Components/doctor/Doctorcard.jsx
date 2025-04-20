import { Card, Rate, Tag, Divider } from "antd";
import Image from "../layout/Image";
import BookModal from "./BookModal";
import { getDayLabel } from "../../lib/utils";

function DoctorCard({ doctor }) {
  return (
    <Card
      hoverable
      role="article"
      aria-label={`Doctor ${doctor.name}'s profile card`}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500"
      cover={
        <div 
          className="h-50 overflow-hidden relative" 
          role="img" 
          aria-label={`Profile photo of ${doctor.name}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" aria-hidden="true" />
          <Image
            alt={`Dr. ${doctor.name}'s profile picture`}
            src={doctor.image}
            effect="blur"
            className="w-full"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />
        </div>
      }
      styles={{ body: { padding: "12px 16px" } }}
    >
      <div className="flex flex-col gap-2 p-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 
              className="text-lg font-bold line-clamp-1 text-gray-800 mb-0"
              tabIndex="0"
            >
              {doctor.name}
            </h2>
            <p 
              className="text-xs text-gray-600 font-medium"
              tabIndex="0"
              aria-label={`Specializes in ${doctor.specialty}`}
            >
              {doctor.specialty}
            </p>
          </div>
          <div role="status" aria-label="Availability status">
            {doctor.availability === "Available" ? (
              <Tag 
                color="success" 
                className="rounded-full px-2 py-0 text-xs"
                aria-label="Doctor is available for appointments"
              >
                Available
              </Tag>
            ) : (
              <Tag 
                color="error" 
                className="rounded-full px-2 py-0 text-xs"
                aria-label="Doctor is currently unavailable"
              >
                Unavailable
              </Tag>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span 
            className="text-xs text-gray-600"
            tabIndex="0"
            aria-label={`Located in ${doctor.location}`}
          >
            {doctor.location}
          </span>
          <div 
            className="flex items-center gap-1"
            role="group"
            aria-label={`Doctor rating: ${doctor.rating} out of 5 stars`}
          >
            <Rate
              disabled
              defaultValue={doctor.rating}
              allowHalf
              className="text-xs"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-500" aria-hidden="true">
              ({doctor.rating})
            </span>
          </div>
        </div>
        <Divider className="my-1" style={{ margin: "4px 0" }} />

        <div>
          <h4 
            className="text-xs font-semibold text-gray-700 mb-1"
            tabIndex="0"
          >
            Available Time Slots
          </h4>
          <div 
            className="grid grid-cols-2 gap-1"
            role="list"
            aria-label="Available appointment times"
          >
            {doctor?.timeSlots?.map((slot, index) => (
              <span
                key={index}
                role="listitem"
                tabIndex="0"
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg text-center font-medium hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label={`Available on ${getDayLabel(slot.date)} at ${slot.time}`}
              >
                {getDayLabel(slot.date)} : {slot.time}
              </span>
            ))}
          </div>
        </div>
        <BookModal doctor={doctor} />
      </div>
    </Card>
  );
}

export default DoctorCard;