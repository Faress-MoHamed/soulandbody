"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadModalProps {
  state: "initial" | "uploading" | "success"
  progress: number
  onClose: () => void
  onUpload: (file: File) => void
  onComplete: () => void
}

export default function UploadModal({ state, progress, onClose, onUpload, onComplete }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-medium text-lg text-right w-full">رفع ملف بشهادة التخرج</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6">
        {state === "initial" && (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center",
              dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mb-4 bg-emerald-100 p-3 rounded-full">
              <Upload className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="mb-2 font-medium">رفع ملفاتك هنا أو اضغط للرفع</p>
            <p className="text-sm text-gray-500 mb-4">SVG, PNG, JPG أو PDF (حجم 5MB كحد أقصى)</p>
            <Button onClick={handleButtonClick} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              تصفح للملفات
            </Button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept=".svg,.png,.jpg,.jpeg,.pdf"
            />
          </div>
        )}

        {state === "uploading" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-8">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xl font-bold">{progress}%</span>
                </div>
              </div>
              <svg className="absolute top-0 left-0" width="96" height="96" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="46" strokeWidth="4" stroke="#e6e6e6" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="46"
                  strokeWidth="4"
                  stroke="#10b981"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={289.02652413026095}
                  strokeDashoffset={289.02652413026095 - (289.02652413026095 * progress) / 100}
                  transform="rotate(-90 48 48)"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">جاري التحميل</h3>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-emerald-100 p-4 rounded-full mb-8">
              <Check className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">تم التحميل</h3>
            <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onComplete}>
              تم
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

