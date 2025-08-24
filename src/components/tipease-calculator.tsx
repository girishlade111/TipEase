"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Users } from "lucide-react";

export function TipeaseCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState("1");
  const [roundUp, setRoundUp] = useState(false);

  const billAmount = parseFloat(bill) || 0;
  const numPeople = parseInt(people, 10) || 1;

  const handleTipSelect = (percent: number) => {
    setTipPercent(percent);
    setCustomTip("");
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    setTipPercent(0);
  };
  
  const activeTip = customTip ? parseFloat(customTip) || 0 : tipPercent;

  const { tipAmount, totalAmount, perPersonAmount } = useMemo(() => {
    if (billAmount <= 0) {
      return { tipAmount: 0, totalAmount: 0, perPersonAmount: 0 };
    }

    const tip = billAmount * (activeTip / 100);
    const total = billAmount + tip;
    let perPerson = total / numPeople;
    
    if (roundUp && perPerson > 0) {
      const newTotal = Math.ceil(perPerson) * numPeople;
      const newTip = newTotal - billAmount;
      return {
        tipAmount: newTip,
        totalAmount: newTotal,
        perPersonAmount: Math.ceil(perPerson),
      };
    }

    return {
      tipAmount: tip,
      totalAmount: total,
      perPersonAmount: perPerson,
    };
  }, [billAmount, activeTip, numPeople, roundUp]);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const tipOptions = [15, 18, 20, 25];

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline tracking-tight">
          TipEase
        </CardTitle>
        <CardDescription>
          Calculate tips and split bills with ease.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bill-amount">Bill Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="bill-amount"
              type="number"
              placeholder="0.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="pl-10 text-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Select Tip %</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {tipOptions.map((tip) => (
              <Button
                key={tip}
                variant={tipPercent === tip ? "default" : "outline"}
                onClick={() => handleTipSelect(tip)}
                className="text-base"
              >
                {tip}%
              </Button>
            ))}
            <Input
              type="number"
              placeholder="Custom"
              value={customTip}
              onChange={handleCustomTipChange}
              className="text-base sm:col-span-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="people">Number of People</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="people"
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="pl-10 text-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="round-up" className="text-base">
            Round up each share?
          </Label>
          <Switch 
            id="round-up"
            checked={roundUp}
            onCheckedChange={setRoundUp}
          />
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full flex justify-between items-center text-lg">
          <span className="text-muted-foreground">Tip Amount</span>
          <span className="font-semibold">{formatCurrency(tipAmount)}</span>
        </div>
        <div className="w-full flex justify-between items-center text-lg">
          <span className="text-muted-foreground">Total Bill</span>
          <span className="font-semibold">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="w-full bg-secondary rounded-lg p-4 mt-4 text-center">
            <p className="text-secondary-foreground">Each Person Pays</p>
            <p className="text-4xl font-bold text-primary tracking-tight">
                {formatCurrency(perPersonAmount)}
            </p>
        </div>
      </CardFooter>
    </Card>
  );
}
