import React from "react";

const ProtectedHomePage = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="w-full flex gap-6 items-center fixed top-0 backdrop-blur-lg bg-accent_bg pt-2 h-16 z-10">
        <h1 className="text-2xl text-white font-bold">Recent Activities</h1>
        <div className="text-md border p-2 rounded text-sm text-accent_fff">
          My notifications
        </div>
      </header>
      <div className="w-full flex flex-col gap-4 pb-28 pt-12">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            John bought 100 ETH with 10 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            2 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Alice sold 50 BTC for 5000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            5 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Bob bought 20 ETH with 2 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            10 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Eve sold 1000 USDT for 0.1 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            15 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Charlie bought 500 BTC with 50000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            20 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">David sold 30 ETH for 3 BTC</p>
          <small className="text-xs text-accent_fff opacity-50">
            25 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Emma bought 1000 USDT with 0.1 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            30 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Frank sold 200 BTC for 20000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            35 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Grace bought 50 ETH with 5 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            40 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Henry sold 1000 USDT for 0.1 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            45 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Isabella bought 300 BTC with 30000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            50 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">Jack sold 40 ETH for 4 BTC</p>
          <small className="text-xs text-accent_fff opacity-50">
            55 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Kate bought 500 USDT with 0.05 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            60 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Liam sold 80 BTC for 8000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            65 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Mia bought 10 ETH with 1 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            70 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Noah sold 2000 USDT for 0.2 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            75 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Olivia bought 100 BTC with 10000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            80 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">Peter sold 70 ETH for 7 BTC</p>
          <small className="text-xs text-accent_fff opacity-50">
            85 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Quinn bought 1000 USDT with 0.1 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            90 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Rachel sold 150 BTC for 15000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            95 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Sam bought 30 ETH with 3 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            100 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Tina sold 500 USDT for 0.05 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            105 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Uma bought 90 BTC with 9000 USDT
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            110 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Victor sold 60 ETH for 6 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            115 minutes ago
          </small>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-accent_fff">
            Wendy bought 2000 USDT with 0.2 BTC
          </p>
          <small className="text-xs text-accent_fff opacity-50">
            120 minutes ago
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProtectedHomePage;
