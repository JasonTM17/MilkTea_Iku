"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

interface StoreCardProps {
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  distance?: string;
}

export default function StoreCard({
  name,
  address,
  district,
  city,
  phone,
  hours,
  mapsUrl,
  distance,
}: StoreCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-all"
    >
      <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">{name}</h3>
          {distance && (
            <span className="text-xs text-brand-700 dark:text-brand-300 font-medium bg-brand-50 dark:bg-brand-900/40 px-2 py-0.5 rounded-full">
              {distance}
            </span>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-brand-500 dark:text-brand-300 mt-0.5 shrink-0" />
            <span>{address}, {district}, {city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-500 dark:text-brand-300 shrink-0" />
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors min-h-11 inline-flex items-center"
            >
              {phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-500 dark:text-brand-300 shrink-0" />
            <span>{hours}</span>
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full flex items-center justify-center gap-2 py-3 min-h-11 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          <Navigation className="w-4 h-4" />
          Chỉ đường
        </a>
      </div>
    </motion.div>
  );
}
