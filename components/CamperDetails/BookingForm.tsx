"use client";

import { useMutation } from "@tanstack/react-query";
import { Formik, type FormikErrors } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { z } from "zod";
import { createBookingRequest } from "@/services/api";
import { Button } from "@/components/ui/Button/Button";

const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .regex(
      /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u,
      "Please enter your full name using letters only.",
    ),
  email: z.string().trim().email("Please enter a valid email address."),
});

type BookingValues = z.infer<typeof bookingSchema>;

const initialValues: BookingValues = {
  name: "",
  email: "",
};

function validateBooking(values: BookingValues): FormikErrors<BookingValues> {
  const result = bookingSchema.safeParse(values);
  if (result.success) return {};

  return result.error.issues.reduce<FormikErrors<BookingValues>>(
    (errors, issue) => {
      const field = issue.path[0];
      if ((field === "name" || field === "email") && !errors[field]) {
        errors[field] = issue.message;
      }
      return errors;
    },
    {},
  );
}

export default function BookingForm({ camperId }: { camperId: string }) {
  const bookingMutation = useMutation({
    mutationFn: (values: BookingValues) =>
      createBookingRequest(camperId, {
        name: values.name.trim(),
        email: values.email.trim(),
      }),
    onSuccess: (response) => {
      toast.success(response.message || "Your booking request was sent.");
    },
    onError: () => {
      toast.error("Could not send the booking request. Please try again.");
    },
  });

  const sendBooking = (
    values: BookingValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    bookingMutation.mutate(values, { onSuccess: resetForm });
  };

  return (
    <section className="rounded-2xl border border-gray-light p-7">
      <h2 className="text-lg font-semibold text-main">
        Book your campervan now
      </h2>
      <p className="mt-2 text-sm text-text">
        Stay connected! We&apos;re always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={sendBooking}
        validate={validateBooking}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            className="mt-5 flex flex-col gap-3"
            noValidate
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="booking-name">
              Name
            </label>
            <div className="relative">
              <input
                autoComplete="name"
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                aria-invalid={touched.name && Boolean(errors.name)}
                className={`h-12 w-full rounded-xl border px-4 pr-12 text-sm text-main outline-none placeholder:text-gray focus:border-grey-green ${
                  touched.name && errors.name
                    ? "border-button bg-error-bg"
                    : "border-transparent bg-inputs"
                }`}
                id="booking-name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Name*"
                value={values.name}
              />
              {touched.name && errors.name && (
                <FiAlertCircle
                  aria-hidden="true"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-button"
                />
              )}
            </div>
            {touched.name && errors.name && (
              <p className="text-sm text-button" id="name-error" role="alert">
                {errors.name}
              </p>
            )}

            <label className="sr-only" htmlFor="booking-email">
              Email
            </label>
            <div className="relative">
              <input
                autoComplete="email"
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                aria-invalid={touched.email && Boolean(errors.email)}
                className={`h-12 w-full rounded-xl border px-4 pr-12 text-sm text-main outline-none placeholder:text-gray focus:border-grey-green ${
                  touched.email && errors.email
                    ? "border-button bg-error-bg"
                    : "border-transparent bg-inputs"
                }`}
                id="booking-email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Email*"
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && (
                <FiAlertCircle
                  aria-hidden="true"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-button"
                />
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-sm text-button" id="email-error" role="alert">
                {errors.email}
              </p>
            )}

            <Button
              className="mt-1"
              disabled={isSubmitting || bookingMutation.isPending}
              size="md"
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        )}
      </Formik>
    </section>
  );
}
