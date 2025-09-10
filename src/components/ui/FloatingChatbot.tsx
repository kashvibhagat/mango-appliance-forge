import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you find the perfect air cooler. What can I assist you with today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    'Which cooler is best for my room?',
    'Compare tower vs desert coolers',
    'Spare parts availability',
    'Warranty information'
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (messageText.toLowerCase().includes('room') || messageText.toLowerCase().includes('size')) {
        botResponse = 'For room selection, I recommend: Small rooms (up to 150 sq ft) - Personal coolers like Cool Master. Medium rooms (150-300 sq ft) - Tower coolers like Arctic TC series. Large rooms (300+ sq ft) - Desert coolers from our Wintry series.';
      } else if (messageText.toLowerCase().includes('compare') || messageText.toLowerCase().includes('tower') || messageText.toLowerCase().includes('desert')) {
        botResponse = 'Tower coolers are compact, stylish and perfect for medium rooms with good air circulation. Desert coolers are powerful, suitable for large open spaces and provide maximum cooling. Would you like specific model recommendations?';
      } else if (messageText.toLowerCase().includes('spare') || messageText.toLowerCase().includes('parts')) {
        botResponse = 'We have genuine Mango spare parts available for all our cooler models. Common parts include cooling pads, water pumps, and motors. All parts come with warranty. Need help finding parts for a specific model?';
      } else if (messageText.toLowerCase().includes('warranty')) {
        botResponse = 'All Mango air coolers come with a comprehensive 2-year warranty covering manufacturing defects. Our service network covers Pan India with 24/7 support. Would you like warranty registration assistance?';
      } else {
        botResponse = 'I\'d be happy to help! You can ask me about cooler recommendations, product comparisons, spare parts, warranty, or any other questions about Mango air coolers.';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-80 h-96 z-50 shadow-2xl animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-brand text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <CardTitle className="text-sm font-semibold">Mango Assistant</CardTitle>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-60">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="px-3 pb-2">
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs py-1 px-2"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={() => handleSendMessage()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-floating animate-bounce-gentle hover:scale-110 btn-ripple"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default FloatingChatbot;