import React from "react";
import { Section } from "@arno/components/layout/Section";
import FloatingInput from "@arno/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent }  from "@arno/components/ui/Card";
import {Button } from "@arno/components/ui/Button";


const Web3FormsContact: React.FC = () => {
  return (
    <Section 
      id="contact-form" 
    >
      <Card className="max-w-md mx-auto shadow-lg bg-background">
        <CardHeader className="items-center text-center">
          <CardTitle>Contact Me</CardTitle>
          <CardDescription>Send me a message and I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
          action="https://api.web3forms.com/submit"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-4 max-w-md mx-auto"
          >
            {/* Required access key */}
            <input type="hidden" name="access_key" value="885bd2f6-9f53-4dc9-97a5-1f79f8eded9b" />
              {/* Hidden fields */}
              <input type="hidden" name="subject" value="New Message On Portfolio Website" />
              <input type="hidden" name="from_name" value="Arno Portfolio Website" />
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />
              <input type="hidden" name="recaptcha_response" id="recaptchaResponse" />

              {/* Hidden botcheck */}
              <input type="checkbox" name="botcheck" className="visually-hidden" />

              {/* Email Field */}
              <FloatingInput label="Email" name="email" type="email" required />

              {/* First Name Field */}
              <FloatingInput label="First Name" name="firstName" required />

              {/* Phone Number Field */}
              <FloatingInput label="Phone Number" name="phoneNumber" />

              {/* Message Field */}
              <FloatingInput label="Message" name="message" as="textarea" rows={6} required />

              {/* Submit Button */}
              <Button
                  type="submit"
                  variant="primary"
              >
                  Send
              </Button>
            </form>
          </CardContent>
        </Card>
    </Section>
  );
};

export default Web3FormsContact;