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
    const value = e.target.value;
    if (parseFloat(value) >= 0 || value === "") {
        setCustomTip(value);
        setTipPercent(0);
    }
  };
  
  const activeTip = customTip ? parseFloat(customTip) || 0 : tipPercent;

  const { tipAmount, totalAmount, perPersonAmount } = useMemo(() => {
    if (billAmount <= 0) {
      return { tipAmount: 0, totalAmount: 0, perPersonAmount: 0 };
    }

    const tip = billAmount * (activeTip / 100);
    const total = billAmount + tip;
    const perPerson = total / numPeople;
    
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
    <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-2 border-border/20">
      <CardHeader className="text-center p-8">
        <CardTitle className="text-4xl font-headline tracking-tight text-primary">
          TipEase
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-1">
          Calculate tips and split bills with ease.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8 pt-0">
        <div className="space-y-2">
          <Label htmlFor="bill-amount" className="text-md">Bill Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="bill-amount"
              type="number"
              placeholder="0.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="pl-12 text-lg h-12 rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-md">Select Tip %</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {tipOptions.map((tip) => (
              <Button
                key={tip}
                variant={tipPercent === tip && !customTip ? "default" : "outline"}
                onClick={() => handleTipSelect(tip)}
                className="text-lg h-12 rounded-lg"
              >
                {tip}%
              </Button>
            ))}
            <Input
              type="number"
              placeholder="Custom"
              value={customTip}
              onChange={handleCustomTipChange}
              className="text-lg h-12 rounded-lg sm:col-span-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="people" className="text-md">Number of People</Label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="people"
              type="number"
              min="1"
              step="1"
              value={people}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (val >= 1) setPeople(e.target.value);
              }}
              className="pl-12 text-lg h-12 rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <Label htmlFor="round-up" className="text-lg">
            Round up each person's share?
          </Label>
          <Switch 
            id="round-up"
            checked={roundUp}
            onCheckedChange={setRoundUp}
          />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col space-y-4 p-8">
        <div className="w-full flex justify-between items-center text-lg">
          <span className="text-muted-foreground">Tip Amount</span>
          <span className="font-semibold text-foreground text-xl">{formatCurrency(tipAmount)}</span>
        </div>
        <div className="w-full flex justify-between items-center text-xl">
          <span className="text-muted-foreground">Total Bill</span>
          <span className="font-bold text-foreground text-2xl">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="w-full bg-primary/10 rounded-xl p-6 mt-6 text-center">
            <p className="text-primary font-semibold">Each Person Pays</p>
            <p className="text-5xl font-bold text-primary tracking-tight">
                {formatCurrency(perPersonAmount)}
            </p>
        </div>
      </CardFooter>
    </Card>
  );
}
