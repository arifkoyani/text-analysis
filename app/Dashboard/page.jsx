'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Upload, ChevronDown, ChevronUp, BarChart2, FileText, Calendar } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// type DataSetItem = {
//   text: string;
//   emotion: number;
//   logic: number;
// }

// type CardProps = {
//   title: string;
//   dataSet: DataSetItem[];
// }
// Mock data and helper functions
const initialData = [
  { text: "This product exceeded my expectations!", emotion: 0.9, logic: 0.8 },
  { text: "The customer service was terrible.", emotion: -0.7, logic: -0.6 },
  { text: "I'm not sure how I feel about this.", emotion: 0.1, logic: -0.1 },
  { text: "The quality is outstanding!", emotion: 0.8, logic: 0.9 },
  { text: "I regret this purchase.", emotion: -0.8, logic: -0.7 },
]

const pastMeetings = [
  {
    id: 1,
    date: "2023-05-15",
    time: "14:30",
    highlightedText: "Product launch discussion",
    feelings: ["Excited", "Optimistic"],
    topics: ["Marketing", "Sales"],
    transcription: [
      { text: "The new product features are impressive.", emotion: 0.7, logic: 0.8 },
      { text: "We need to focus on our target audience.", emotion: 0.2, logic: 0.9 },
      { text: "The pricing strategy might be too aggressive.", emotion: -0.3, logic: 0.5 },
    ],
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    notableInsights: [
      { summary: "New product features well-received", details: "The team expressed enthusiasm about the innovative features of the new product." },
      { summary: "Concerns about pricing strategy", details: "There were discussions about the pricing strategy being potentially too aggressive for the target market." },
    ],
  },
  {
    id: 2,
    date: "2023-05-10",
    time: "10:00",
    highlightedText: "Customer feedback review",
    feelings: ["Concerned", "Determined"],
    topics: ["Support", "Product Development"],
    transcription: [
      { text: "Several customers reported issues with the UI.", emotion: -0.6, logic: 0.7 },
      { text: "We need to improve our response time.", emotion: -0.4, logic: 0.8 },
      { text: "The new feature has received positive feedback.", emotion: 0.8, logic: 0.9 },
    ],
    participants: ["Alice Brown", "Bob Wilson", "Carol Taylor"],
    notableInsights: [
      { summary: "UI issues reported by customers", details: "Multiple customers have reported difficulties navigating the user interface, suggesting a need for UX improvements." },
      { summary: "Positive reception of new feature", details: "The recently launched feature has been well-received by users, indicating a successful product addition." },
    ],
  },
  {
    id: 3,
    date: "2023-05-05",
    time: "15:45",
    highlightedText: "Team performance evaluation",
    feelings: ["Proud", "Motivated"],
    topics: ["HR", "Performance"],
    transcription: [
      { text: "Our team has exceeded expectations this quarter.", emotion: 0.9, logic: 0.8 },
      { text: "We need to address the high turnover in the sales department.", emotion: -0.5, logic: 0.7 },
      { text: "The new training program has shown promising results.", emotion: 0.6, logic: 0.8 },
    ],
    participants: ["David Lee", "Emma Clark", "Frank Rodriguez"],
    notableInsights: [
      { summary: "Exceptional team performance", details: "The team has surpassed expectations in their quarterly performance, showing strong growth and productivity." },
      { summary: "High turnover in sales department", details: "There is a concerning trend of high employee turnover in the sales department that needs to be addressed." },
    ],
  },
]

const generateRandomData = () => {
  const feelings = ['Happy', 'Sad', 'Excited', 'Angry', 'Confused', 'Satisfied', 'Disappointed', 'Neutral']
  const topics = ['Product Quality', 'Customer Service', 'User Experience', 'Price', 'Delivery', 'Features', 'Reliability', 'Performance']
  
  return {
    feelings: Array(3).fill(null).map(() => feelings[Math.floor(Math.random() * feelings.length)]),
    topics: Array(3).fill(null).map(() => topics[Math.floor(Math.random() * topics.length)])
  }
}

const generatePatternDetection = (emotion, logic) => {
  const sentences = [
    `The sentiment analysis reveals a ${emotion > 0 ? 'positive' : 'negative'} emotional response with a strength of ${Math.abs(emotion).toFixed(2)}.`,
    `The logical assessment of the statement is ${logic > 0 ? 'favorable' : 'unfavorable'} with a confidence of ${Math.abs(logic).toFixed(2)}.`,
    `There appears to be a ${Math.abs(emotion - logic) < 0.3 ? 'strong' : 'weak'} correlation between emotional and logical responses.`,
    `This pattern suggests ${emotion * logic > 0 ? 'alignment' : 'conflict'} between emotional and rational perspectives on the subject.`
  ]
  return sentences
}

export default function TextAnalysisDashboard() {
  const [data, setData] = useState(initialData)
  const [inputText, setInputText] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedPastMeeting, setSelectedPastMeeting] = useState(null)
  const textRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      const newItem = {
        text: inputText,
        emotion: (Math.random() * 2 - 1),
        logic: (Math.random() * 2 - 1),
      }
      setData([...data, newItem])
      setInputText("")
    }
  }

  const handleUpload = () => {
    // Placeholder for upload functionality
    console.log("Upload functionality to be implemented")
  }

  const handleMouseDown = (e) => {
    if (textRef.current && textRef.current.contains(e.target)) {
      setIsSelecting(true)
      setSelectedItems([])
    }
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
  }

  const handleMouseMove = (e) => {
    if (isSelecting && textRef.current) {
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const textElement = elements.find(el => el.classList.contains('text-item'))
      if (textElement) {
        const index = parseInt(textElement.getAttribute('data-index') || '-1', 10)
        if (index !== -1 && !selectedItems.some(item => item.text === data[index].text)) {
          setSelectedItems(prev => [...prev, { ...data[index], randomData: generateRandomData() }])
        }
      }
    }
  }

  const handleTextClick = (item) => {
    setSelectedItems(prev => 
      prev.some(i => i.text === item.text)
        ? prev.filter(i => i.text !== item.text)
        : [...prev, { ...item, randomData: generateRandomData() }]
    )
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const normalizeValue = (value) => {
    return (value + 1) / 2 * 100
  }

  const renderDistributionGraph = (dataSet, height = "h-[400px]") => (
    <div className={`relative ${height}`}>
      <div className="flex justify-center space-x-4 text-sm mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Emotion</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Logic</span>
        </div>
      </div>

      <div className="absolute top-8 left-0 w-full flex justify-between text-xs text-gray-500 z-10">
        <span>-3σ</span>
        <span>-2σ</span>
        <span>-1σ</span>
        <span>Median</span>
        <span>+1σ</span>
        <span>+2σ</span>
        <span>+3σ</span>
      </div>

      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <rect x="0%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.1)" />
        <rect x="16.67%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.08)" />
        <rect x="33.33%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.06)" />
        <rect x="50%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.04)" />
        <rect x="66.67%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.06)" />
        <rect x="83.33%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.08)" />
        <rect x="100%" y="0" width="16.67%" height="100%" fill="rgba(128, 0, 128, 0.1)" />
      </svg>

      {dataSet.map((item, index) => (
        <React.Fragment key={index}>
          <div 
            className="absolute w-3 h-3 rounded-full bg-red-500 transition-all duration-300 ease-in-out hover:w-4 hover:h-4"
            style={{ 
              left: `${normalizeValue(item.emotion)}%`,
              top: `${(index / (dataSet.length - 1)) * 100}%`
            }}
            title={`Emotion: ${item.emotion.toFixed(2)}`}
          />
          <div 
            className="absolute w-3 h-3 rounded-full bg-blue-500 transition-all duration-300 ease-in-out hover:w-4 hover:h-4"
            style={{ 
              left: `${normalizeValue(item.logic)}%`,
              top: `${(index / (dataSet.length - 1)) * 100}%`
            }}
            title={`Logic: ${item.logic.toFixed(2)}`}
          />
        </React.Fragment>
      ))}
    </div>
  )

  const renderMeetingCard = (title, dataSet) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <h3 className="text-md font-semibold mb-2">Meeting Transcription</h3>
            <ScrollArea className="h-[400px] border rounded">
              {dataSet.map((item, index) => (
                <div key={index} className="p-2 border-b last:border-b-0">
                  <p>{item.text}</p>
                  <p className="text-sm text-gray-500">
                    Emotion: {item.emotion.toFixed(2)}, Logic: {item.logic.toFixed(2)}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-md font-semibold mb-2">Sentiment Analysis</h3>
            {renderDistributionGraph(dataSet, "h-[400px]")}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <Card className="mb-8 bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-purple-800">Sentiment Analysis Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text for analysis"
                className="flex-grow"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Analyze</Button>
              <Button type="button" onClick={handleUpload} variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="analysis" className="mb-8">
        <TabsList className="grid w-full  grid-cols-2 mb-4">
          <TabsTrigger value="analysis" className="text-lg">
            <FileText className="mr-2 h-5 w-5" />
            Text Analysis
          </TabsTrigger>
          <TabsTrigger value="meetings" className="text-lg">
            <Calendar className="mr-2 h-5 w-5" />
            Past Meetings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analysis">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Text Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={textRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                className="mb-4"
              >
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={`text-item p-2 cursor-pointer rounded-md transition-colors duration-200 ${
                      selectedItems.some((i) => i.text === item.text) ? 'bg-purple-100' : 'hover:bg-gray-100'
                    }`}
                    data-index={index}
                    onClick={() => handleTextClick(item)}
                  >
                    {item.text}
                  </div>
                ))}
              </div>

              {selectedItems.length > 0 && (
                <Card className="mb-4 p-4 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Selected Items Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedItems.map((item, index) => (
                      <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{item.text}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Emotion: {item.emotion.toFixed(2)}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Logic: {item.logic.toFixed(2)}
                          </Badge>
                        </div>
                        <div className="text-sm mt-2">
                          <strong>Feelings:</strong> {item.randomData.feelings.map((feeling, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1">{feeling}</Badge>
                          ))}
                        </div>
                        <div className="text-sm mt-2">
                          <strong>Topics:</strong> {item.randomData.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    {renderDistributionGraph(selectedItems)}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meetings">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Past Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="mb-4">
                {pastMeetings.map((meeting) => (
                  <AccordionItem key={meeting.id} value={`meeting-${meeting.id}`}>
                    <AccordionTrigger className="hover:bg-purple-50 rounded-md px-2">
                      <div className="flex items-center justify-between w-full">
                        <span>{meeting.date} - {meeting.time}</span>
                        <span className="text-sm text-gray-500">{meeting.highlightedText}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-2 rounded-md bg-white">
                        <p><strong>Participants:</strong> {meeting.participants.join(', ')}</p>
                        <div className="mt-2">
                          <strong>Feelings:</strong> {meeting.feelings.map((feeling, i) => (
                            <Badge key={i} variant="secondary" className="mr-1 mb-1">{feeling}</Badge>
                          ))}
                        </div>
                        <div className="mt-2">
                          <strong>Topics:</strong> {meeting.topics.map((topic, i) => (
                            <Badge key={i} variant="outline" className="mr-1 mb-1">{topic}</Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => setSelectedPastMeeting(meeting)} 
                          className="mt-4 bg-purple-600 hover:bg-purple-700"
                        >
                          View Detailed Analysis
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedPastMeeting} onOpenChange={() => setSelectedPastMeeting(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedPastMeeting?.highlightedText}</DialogTitle>
          </DialogHeader>
          {selectedPastMeeting && renderMeetingCard("Meeting Analysis", selectedPastMeeting.transcription)}
        </DialogContent>
      </Dialog>
    </div>
  )
}