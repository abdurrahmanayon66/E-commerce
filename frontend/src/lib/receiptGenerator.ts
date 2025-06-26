import { Payment } from "@/components/PaymentTransactions";
import jsPDF from "jspdf";

type UserType = "customer" | "seller";

export const generateReceipt = (
  payment: Payment,
  userType: UserType
): jsPDF => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();

  const primaryColor = "#1a1a1a";
  const secondaryColor = "#666666";
  const accentColor = "#0066cc";

  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, pageWidth, 40, "F");

  pdf.setFontSize(24);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  pdf.text("XYZ Marketplace", 20, 25);

  pdf.setFontSize(14);
  pdf.setTextColor(secondaryColor);
  pdf.text(
    userType === "seller"
      ? "Payment Receipt - Seller"
      : "Payment Receipt - Customer",
    20,
    32
  );

  pdf.setFontSize(10);
  pdf.setTextColor(secondaryColor);
  const receiptDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.text(`Receipt Date: ${receiptDate}`, pageWidth - 20, 20, {
    align: "right",
  });
  pdf.text(
    `Receipt #: RCP-${payment._id.slice(-8).toUpperCase()}`,
    pageWidth - 20,
    27,
    { align: "right" }
  );

  let yPos = 55;

  pdf.setFillColor(240, 244, 248);
  pdf.rect(20, yPos, pageWidth - 40, 8, "F");
  pdf.setFontSize(12);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  pdf.text("Transaction Details", 25, yPos + 5.5);

  yPos += 15;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(secondaryColor);
  pdf.text("Transaction ID:", 25, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text(payment.transactionId || "N/A", 60, yPos);

  yPos += 7;

  pdf.setTextColor(secondaryColor);
  pdf.text("Transaction Date:", 25, yPos);
  pdf.setTextColor(primaryColor);
  const transactionDate = new Date(payment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  pdf.text(transactionDate, 60, yPos);

  yPos += 7;

  pdf.setTextColor(secondaryColor);
  pdf.text("Payment Method:", 25, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text(payment.paymentMethod?.toUpperCase() || "N/A", 60, yPos);

  yPos += 7;

  pdf.setTextColor(secondaryColor);
  pdf.text("Payment Status:", 25, yPos);
  const status = payment.paymentStatus || "unknown";
  if (status === "paid") {
    pdf.setTextColor(34, 197, 94);
  } else if (status === "pending") {
    pdf.setTextColor(251, 146, 60);
  } else {
    pdf.setTextColor(239, 68, 68);
  }
  pdf.setFont("helvetica", "bold");
  pdf.text(status.toUpperCase(), 60, yPos);

  yPos += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(secondaryColor);
  pdf.text("Order Status:", 25, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text(payment.orderStatus?.toUpperCase() || "N/A", 60, yPos);

  yPos += 20;

  const tableX = 25;
  const tableWidth = pageWidth - 50;

  pdf.setFillColor(240, 244, 248);
  pdf.rect(tableX, yPos, tableWidth, 8, "F");
  pdf.setFontSize(12);
  pdf.setTextColor(primaryColor);
  pdf.setFont("helvetica", "bold");
  pdf.text("Product Details", tableX + 5, yPos + 5.5);

  yPos += 8;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(primaryColor);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  pdf.setFillColor(245, 247, 250);
  pdf.rect(tableX, yPos, tableWidth, 8, "F");
  pdf.setTextColor(secondaryColor);
  pdf.text("Description", tableX + 5, yPos + 5.5);
  pdf.text("Qty", pageWidth - 80, yPos + 5.5);
  pdf.text("Unit Price", pageWidth - 60, yPos + 5.5);
  pdf.text("Total", pageWidth - 30, yPos + 5.5, { align: "right" });

  yPos += 8;

  pdf.setFillColor(255, 255, 255);
  pdf.rect(tableX, yPos, tableWidth, 8, "F");
  pdf.setTextColor(primaryColor);
  const productName = payment.productTitle || "Untitled Product";
  const truncatedName =
    productName.length > 30
      ? productName.substring(0, 30) + "..."
      : productName;
  pdf.text(truncatedName, tableX + 5, yPos + 5.5);
  pdf.text(payment.quantity.toString(), pageWidth - 80, yPos + 5.5);
  pdf.text(`$${payment.price.toFixed(2)}`, pageWidth - 60, yPos + 5.5);
  pdf.text(
    `$${(payment.price * payment.quantity).toFixed(2)}`,
    pageWidth - 30,
    yPos + 5.5,
    { align: "right" }
  );

  yPos += 15;

  pdf.setDrawColor(220, 220, 220);
  pdf.line(25, yPos, pageWidth - 25, yPos);

  yPos += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(secondaryColor);
  pdf.text("Subtotal:", pageWidth - 80, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text(
    `$${(payment.price * payment.quantity).toFixed(2)}`,
    pageWidth - 30,
    yPos,
    { align: "right" }
  );

  yPos += 7;

  pdf.setTextColor(secondaryColor);
  pdf.text("Tax:", pageWidth - 80, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text("$0.00", pageWidth - 30, yPos, { align: "right" });

  yPos += 7;

  pdf.setDrawColor(220, 220, 220);
  pdf.line(pageWidth - 80, yPos, pageWidth - 25, yPos);
  yPos += 5;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(primaryColor);
  pdf.text("Total Amount:", pageWidth - 80, yPos);
  pdf.setTextColor(primaryColor);
  pdf.text(
    `$${(payment.price * payment.quantity).toFixed(2)}`,
    pageWidth - 30,
    yPos,
    { align: "right" }
  );

  yPos = 250;

  pdf.setDrawColor(220, 220, 220);
  pdf.line(25, yPos, pageWidth - 25, yPos);

  yPos += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(secondaryColor);

  if (userType === "seller") {
    pdf.text(
      "This receipt confirms the payment received for your product sale.",
      25,
      yPos
    );
    yPos += 5;
    pdf.text(
      "All transactions are securely processed via XYZ gateway.",
      25,
      yPos
    );
  } else {
    pdf.text(
      "Thank you for your purchase! This receipt serves as proof of payment.",
      25,
      yPos
    );
    yPos += 5;
    pdf.text(
      "All transactions are securely processed via XYZ gateway.",
      25,
      yPos
    );
  }

  yPos += 10;

  pdf.setFontSize(8);
  pdf.text(
    "For support: support@xyzmarketplace.com | Phone: +1 (555) 123-4567",
    25,
    yPos
  );

  return pdf;
};

export const downloadReceipt = (payment: Payment, userType: UserType): void => {
  try {
    const pdf = generateReceipt(payment, userType);
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error generating receipt:", error);
    alert("Failed to generate receipt. Please try again.");
  }
};
