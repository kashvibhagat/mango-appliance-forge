import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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

export interface ChatbotRef {
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

interface FloatingChatbotProps {
  hideFloatingButton?: boolean;
}

const FloatingChatbot = forwardRef<ChatbotRef, FloatingChatbotProps>(({ hideFloatingButton = false }, ref) => {
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

  const chatbotMethods = {
    openChat: () => setIsOpen(true),
    closeChat: () => setIsOpen(false),
    toggleChat: () => setIsOpen(prev => !prev),
  };

  useImperativeHandle(ref, () => chatbotMethods);

  // External event triggers (no context/refs required)
  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('mango-chat-open', onOpen);
    window.addEventListener('mango-chat-close', onClose);
    window.addEventListener('mango-chat-toggle', onToggle);
    return () => {
      window.removeEventListener('mango-chat-open', onOpen);
      window.removeEventListener('mango-chat-close', onClose);
      window.removeEventListener('mango-chat-toggle', onToggle);
    };
  }, []);


  const quickQuestions = [
    'Which cooler for 200 sq ft room?',
    'Compare tower vs desert coolers', 
    'Spare parts for Cool Master',
    'Warranty registration help',
    'Budget under ₹15,000?',
    'Power consumption details'
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

      // Simulate bot response with enhanced logic
      setTimeout(() => {
        let botResponse = '';
        
        if (messageText.toLowerCase().includes('room') || messageText.toLowerCase().includes('size') || messageText.toLowerCase().includes('area')) {
          botResponse = 'For room selection, I recommend: \n\n• **Small rooms (up to 150 sq ft)** - Personal coolers like Cool Master (₹7,999-₹8,999)\n• **Medium rooms (150-300 sq ft)** - Tower coolers like Arctic TC series (₹10,999-₹12,999)\n• **Large rooms (300+ sq ft)** - Desert coolers from our Wintry series (₹15,999+)\n\nWhat\'s your room size in square feet?';
        } else if (messageText.toLowerCase().includes('compare') || messageText.toLowerCase().includes('tower') || messageText.toLowerCase().includes('desert')) {
          botResponse = '**Tower vs Desert Coolers:**\n\n**Tower Coolers:**\n• Compact & stylish design\n• Perfect for medium rooms\n• Better air circulation\n• Price: ₹10,999-₹16,999\n\n**Desert Coolers:**\n• Powerful cooling for large spaces\n• Higher water capacity\n• Best for open areas\n• Price: ₹15,999+\n\nWhich type of space are you cooling?';
        } else if (messageText.toLowerCase().includes('spare') || messageText.toLowerCase().includes('parts')) {
          botResponse = 'We have **genuine Mango spare parts** available:\n\n• **Water Pumps** - ₹899 onwards\n• **Motors** - ₹2,499 onwards  \n• **Honeycomb Pads** - ₹1,299 for set of 4\n• **Remote Controls** - ₹499\n• **Filters** - ₹299 onwards\n\nAll parts come with warranty. Which cooler model do you need parts for?';
        } else if (messageText.toLowerCase().includes('warranty') || messageText.toLowerCase().includes('service')) {
          botResponse = '**Warranty & Service:**\n\n• **2-3 years comprehensive warranty** on all coolers\n• **24/7 customer support** - +91 880 404 8811\n• **Pan India service network**\n• **Free warranty registration** available\n\nWould you like help with warranty registration or service booking?';
        } else if (messageText.toLowerCase().includes('price') || messageText.toLowerCase().includes('budget') || messageText.toLowerCase().includes('cost')) {
          const budgetRanges = [
            'Under ₹10,000 - Personal coolers (Cool Master series)',
            '₹10,000-₹15,000 - Tower coolers (Arctic TC series)', 
            '₹15,000+ - Desert & Industrial coolers'
          ];
          botResponse = `**Budget-wise recommendations:**\n\n${budgetRanges.map(range => `• ${range}`).join('\n')}\n\n**Free shipping** on orders above ₹4,999!\n\nWhat\'s your budget range?`;
        } else if (messageText.toLowerCase().includes('power') || messageText.toLowerCase().includes('consumption') || messageText.toLowerCase().includes('electricity')) {
          botResponse = '**Power Consumption Guide:**\n\n• **Personal coolers**: 140-160W (₹2-3/hour)\n• **Tower coolers**: 120-220W (₹3-5/hour)\n• **Desert coolers**: 180-300W (₹4-7/hour)\n\nAll our coolers are **energy efficient** with 5-star ratings. Need help choosing based on power requirements?';
        } else {
          botResponse = '👋 **Welcome to Mango Appliances!**\n\nI can help you with:\n• **Cooler recommendations** by room size\n• **Product comparisons** \n• **Spare parts** information\n• **Warranty & service** support\n• **Budget-friendly** options\n\nWhat would you like to know about our air coolers?';
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

      {/* Floating Button - only show if not hidden */}
      {!hideFloatingButton && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-floating animate-bounce-gentle hover:scale-110 btn-ripple"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </>
  );
});

FloatingChatbot.displayName = 'FloatingChatbot';

export default FloatingChatbot;