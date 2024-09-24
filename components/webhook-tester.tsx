"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WebhookTester() {
  const [url, setUrl] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [name, setName] = useState("Nano Apps");
  const [email, setEmail] = useState("miracleficient@gmail.com");
  const [phone, setPhone] = useState("08135155549");
  const [amount, setAmount] = useState("0.15");
  const [description, setDescription] = useState(
    "Payment for Nano Apps company developer account"
  );
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      retries: 0,
      acknowledged: false,
      dispatched: false,
      type: "credit",
      _id: "66efda4b7f53c602260f8152",
      chargeId: "66efcc127f53c602260f7186",
      reference: "2xGOt7Df5UuDcv8Y",
      data: {
        from: "0xb408ba67a646A028d50AdA096DEc5E005Ab83d2D",
        to: "160005",
        network: "bsc",
        transaction_id: "internal-transfer-66efda477f53c602260f812e",
        status: "CONFIRMED",
        timestamp: new Date().toISOString(),
        value: {
          local: { amount, currency: "USD" },
          crypto: { amount: 5, currency: "PAY" },
        },
        block: { hash: "internal-transfer-66efda477f53c602260f812e" },
        charge: {
          customer: { user_id: "66c6880662c3e811fc0d03ca", name, email, phone },
          billing: {
            currency: "USD",
            vat: 0,
            pricing_type: "fixed_price",
            amount,
            description,
            country: "US",
          },
          status: {
            context: { status: "overpaid", value: 0.45 },
            value: "overpaid",
            total_paid: 0.6,
          },
          ref_id: "qdB-JmBTdT-51revnbz5w",
          payments: [
            {
              from: "0xb408ba67a646A028d50AdA096DEc5E005Ab83d2D",
              to: "160005",
              network: "bsc",
              transaction_id: "internal-transfer-66efda477f53c602260f812e",
              status: "CONFIRMED",
              timestamp: new Date().toISOString(),
              value: {
                local: { amount, currency: "USD" },
                crypto: { amount: 5, currency: "PAY" },
              },
              block: {
                height: null,
                hash: "internal-transfer-66efda477f53c602260f812e",
              },
            },
          ],
          charge_source: "external",
          createdAt: new Date().toISOString(),
          _id: "66efcc127f53c602260f7186",
          metadata: {
            is_approved: "yes",
            order_id: "OR2",
            charge_ref: "REF",
            purpose: "developer-account-fee",
            developer: "66ee28024d47887c8d4ca69c",
          },
          call_back_url: "http://localhost:8000/verifyorder/",
          app_id: "66ecca9e10db6501df7ee3ff",
          userId: "66ecca9e10db6501df7ee3fc",
          chargeId: "66efcc127f53c602260f7186",
          __v: 0,
        },
        appId: "66ecca9e10db6501df7ee3ff",
      },
      cryptoChargeId: "66efd9f87f53c602260f7fc2",
      createdAt: new Date().toISOString(),
      __v: 0,
    };

    try {
      const res = await fetch("/api/send-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, verificationToken, payload }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(
        "Error sending webhook: " + (error as { message: string })?.message
      );
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Webhook Tester</CardTitle>
        <CardDescription>
          Send a test webhook with customizable payload
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="url">Webhook URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-webhook-url.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="verificationToken">Verification Token</Label>
            <Input
              id="verificationToken"
              value={verificationToken}
              onChange={(e) => setVerificationToken(e.target.value)}
              placeholder="Enter your verification token"
            />
          </div>
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Customer Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="phone">Customer Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit">Send Webhook</Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Label htmlFor="response">Response</Label>
          <Textarea id="response" value={response} readOnly className="h-40" />
        </div>
      </CardFooter>
    </Card>
  );
}
