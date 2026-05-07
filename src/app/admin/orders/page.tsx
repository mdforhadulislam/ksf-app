'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      toast.success('Updated!');
      fetchOrders();
    } catch {
      toast.error('Failed');
    }
  };


const generateInvoice = (order: any) => {
  const doc = new jsPDF();

  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : 'N/A';

  // 🎨 Colors
  const primaryGreen: [number, number, number] = [0, 255, 150]; // neon green
  const darkGreen: [number, number, number] = [0, 100, 70];

  // 🔷 HEADER BACKGROUND
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, 210, 30, 'F');

  // 🏢 COMPANY NAME
  doc.setTextColor(...primaryGreen);
  doc.setFontSize(18);
  doc.text('KSF ECOMMERCE', 14, 18);

  // 📄 INVOICE TITLE
  doc.setFontSize(12);
  doc.text('INVOICE', 160, 18);

  // 🔄 RESET TEXT COLOR
  doc.setTextColor(0, 0, 0);

  // 📌 COMPANY INFO
  doc.setFontSize(10);
  doc.text('KSF ECOMMERCE', 14, 36);
  doc.text('Dhaka, Bangladesh', 14, 42);
  doc.text('Phone: 01818779059', 14, 48);
  doc.text('Email: ksfhomedecor@gmail.com', 14, 54);

  // 📦 ORDER INFO BOX
  doc.setDrawColor(...primaryGreen);
  doc.rect(140, 36, 60, 30);

  doc.setFontSize(10);
  doc.text(`Order ID: ${order.id}`, 145, 44);
  doc.text(`Date: ${dateStr}`, 145, 50);

  // 👤 CUSTOMER INFO
  doc.setFontSize(11);
  doc.setTextColor(...darkGreen);
  doc.text('Customer Info', 14, 70);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Name: ${order.shippingInfo?.name}`, 14, 78);
  doc.text(`Phone: ${order.shippingInfo?.phone}`, 14, 84);
  doc.text(`Address: ${order.shippingInfo?.address}`, 14, 90);

  // 📊 TABLE
  const tableData = order.items?.map((item: any) => [
    item.name,
    item.quantity,
    `BDT ${item.price.toFixed(2)}`,
    `BDT ${(item.price * item.quantity).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 100,
    head: [['Product', 'Qty', 'Price', 'Total']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: primaryGreen,
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [240, 255, 250],
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 120;

  // 💰 TOTAL BOX
  doc.setDrawColor(...primaryGreen);
  doc.rect(140, finalY + 10, 60, 20);

  doc.setFontSize(12);
  doc.setTextColor(...darkGreen);
  doc.text('TOTAL', 145, finalY + 18);

  doc.setTextColor(0, 0, 0);
  doc.text(`BDT ${order.total?.toFixed(2)}`, 145, finalY + 26);

  // 💳 PAYMENT INFO
  doc.setFontSize(10);
  doc.text(`Payment: ${order.paymentMethod}`, 14, finalY + 20);
  doc.text(`Status: ${order.status}`, 14, finalY + 26);

  // ✨ FOOTER LINE
  doc.setDrawColor(...primaryGreen);
  doc.line(14, finalY + 40, 196, finalY + 40);

  doc.setFontSize(10);
  doc.setTextColor(...darkGreen);
  doc.text(
    'Thank you for shopping with KSF Ecommerce 💚',
    14,
    finalY + 48
  );

  // 📥 SAVE
  doc.save(`invoice_${order.id}.pdf`);
};

  if (loading)
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-black mb-8">
          Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border">

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">
                    #{order.id?.slice(0, 8)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatus(order.id, e.target.value)
                    }
                    className="px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => generateInvoice(order)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>

                {order.items?.map((item: any) => (
                  <div
                    key={item.productId}
                    className="flex justify-between py-1 text-sm"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      BDT {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-black">
                    BDT {order.total?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div className="border-t mt-4 pt-4 text-sm text-gray-600">
                <p className="font-semibold">
                  {order.shippingInfo?.name}
                </p>
                <p>{order.shippingInfo?.phone}</p>
                <p>{order.shippingInfo?.address}</p>
                <p className="mt-2">
                  Payment:{' '}
                  <span className="font-semibold">
                    {order.paymentMethod?.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}