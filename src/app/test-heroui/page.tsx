'use client'

import { Button, Card, CardBody, Input, Textarea, Chip } from '@heroui/react'

export default function TestHeroUIPage() {
  return (
    <div className="p-8 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold text-foreground">
        HeroUI Components Test
      </h1>

      {/* Debug: Show CSS variables */}
      <div className="text-small text-default-500">
        CSS Variables Test:
        <span className="text-primary">Primary Color</span> |
        <span className="text-secondary">Secondary Color</span> |
        <span className="text-danger">Danger Color</span>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Button Components</h2>

          <div className="flex gap-2">
            <Button color="primary">Primary Button</Button>
            <Button color="secondary">Secondary Button</Button>
            <Button color="danger">Danger Button</Button>
          </div>

          <div className="flex gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Form Components</h2>

          <Input label="Email" placeholder="Enter your email" type="email" />

          <Textarea
            label="Message"
            placeholder="Enter your message"
            minRows={3}
          />

          <Input
            label="Error Example"
            placeholder="This has an error"
            isInvalid
            errorMessage="This field is required"
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Other Components</h2>

          <div className="flex gap-2">
            <Chip color="primary">Primary Chip</Chip>
            <Chip color="danger">Error Chip</Chip>
            <Chip color="success">Success Chip</Chip>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
